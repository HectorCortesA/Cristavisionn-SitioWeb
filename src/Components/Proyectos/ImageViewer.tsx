// components/Proyectos/ImageViewer.tsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import "../../Css/ImageViewer.css";

interface ImageType {
  id: number;
  alt: string;
  src: string;
}

interface ImageViewerProps {
  isOpen: boolean;
  onClose: () => void;
  image: ImageType | null;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

type View = { scale: number; x: number; y: number };

const INITIAL: View = { scale: 1, x: 0, y: 0 };
const MIN_SCALE = 1;
const MAX_SCALE = 5;
const STEP = 0.5;

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

const Icon: React.FC<{ d: string }> = ({ d }) => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
);

const ImageViewer: React.FC<ImageViewerProps> = ({
  isOpen,
  onClose,
  image,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}) => {
  const [view, setView] = useState<View>(INITIAL);
  const [dragging, setDragging] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pan = useRef<{ x: number; y: number; vx: number; vy: number } | null>(
    null
  );
  const pinch = useRef<{ dist: number; scale: number } | null>(null);
  const start = useRef<{ x: number; y: number; t: number } | null>(null);
  const lastTap = useRef<{ x: number; y: number; t: number } | null>(null);
  const gestureMax = useRef(0); // máximo de dedos en el gesto actual

  // Cuánto se puede desplazar la foto según el zoom (sin salirse del encuadre)
  const bounds = useCallback((scale: number) => {
    const stage = stageRef.current;
    const img = imgRef.current;
    if (!stage || !img || !img.naturalWidth) return { mx: 0, my: 0 };
    const fit = Math.min(
      stage.clientWidth / img.naturalWidth,
      stage.clientHeight / img.naturalHeight
    );
    return {
      mx: Math.max(0, (img.naturalWidth * fit * scale - stage.clientWidth) / 2),
      my: Math.max(
        0,
        (img.naturalHeight * fit * scale - stage.clientHeight) / 2
      ),
    };
  }, []);

  // Zoom que mantiene fijo el punto bajo los dedos (o el cursor)
  const zoomTo = useCallback(
    (next: number, focal?: { x: number; y: number }) => {
      setView((v) => {
        const scale = clamp(next, MIN_SCALE, MAX_SCALE);
        let { x, y } = v;
        const stage = stageRef.current;
        if (focal && stage) {
          const r = stage.getBoundingClientRect();
          const fx = focal.x - (r.left + r.width / 2);
          const fy = focal.y - (r.top + r.height / 2);
          const k = scale / v.scale;
          x = fx - (fx - v.x) * k;
          y = fy - (fy - v.y) * k;
        }
        const { mx, my } = bounds(scale);
        return { scale, x: clamp(x, -mx, mx), y: clamp(y, -my, my) };
      });
    },
    [bounds]
  );

  const reset = useCallback(() => {
    setView(INITIAL);
    setDragging(false);
    pointers.current.clear();
    pan.current = null;
    pinch.current = null;
  }, []);

  const close = () => {
    reset();
    onClose();
  };
  const goPrev = () => {
    if (hasPrev) {
      reset();
      onPrev();
    }
  };
  const goNext = () => {
    if (hasNext) {
      reset();
      onNext();
    }
  };

  // Teclado: siempre usa los manejadores más recientes
  const latest = useRef({ close, goPrev, goNext, zoomTo, scale: view.scale });
  useEffect(() => {
    latest.current = { close, goPrev, goNext, zoomTo, scale: view.scale };
  });

  // El foco entra al visor (sin aro visible) y Tab queda dentro de sus controles
  useEffect(() => {
    if (isOpen) rootRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      const l = latest.current;
      if (e.key === "Escape") l.close();
      else if (e.key === "ArrowLeft") l.goPrev();
      else if (e.key === "ArrowRight") l.goNext();
      else if (e.key === "+" || e.key === "=") l.zoomTo(l.scale + STEP);
      else if (e.key === "-") l.zoomTo(l.scale - STEP);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    gestureMax.current = Math.max(gestureMax.current, pointers.current.size);
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinch.current = {
        dist: Math.hypot(a.x - b.x, a.y - b.y),
        scale: view.scale,
      };
      pan.current = null;
    } else {
      start.current = { x: e.clientX, y: e.clientY, t: Date.now() };
      pan.current = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y };
    }
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2 && pinch.current) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      zoomTo((pinch.current.scale * dist) / pinch.current.dist, {
        x: (a.x + b.x) / 2,
        y: (a.y + b.y) / 2,
      });
    } else if (pan.current && view.scale > 1) {
      const { mx, my } = bounds(view.scale);
      const p = pan.current;
      setView((v) => ({
        ...v,
        x: clamp(p.vx + e.clientX - p.x, -mx, mx),
        y: clamp(p.vy + e.clientY - p.y, -my, my),
      }));
    }
  };

  const onPointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(e.pointerId);
    pinch.current = null;
    const rest = [...pointers.current.values()][0];
    pan.current = rest
      ? { x: rest.x, y: rest.y, vx: view.x, vy: view.y }
      : null;
    if (pointers.current.size > 0) return;

    setDragging(false);
    const s = start.current;
    if (s && gestureMax.current === 1 && e.type === "pointerup") {
      const dx = e.clientX - s.x;
      const dy = e.clientY - s.y;
      const dt = Date.now() - s.t;
      if (Math.hypot(dx, dy) < 10 && dt < 350) {
        // Doble toque / doble clic: acerca o restablece
        const now = Date.now();
        const lt = lastTap.current;
        if (
          lt &&
          now - lt.t < 320 &&
          Math.hypot(e.clientX - lt.x, e.clientY - lt.y) < 30
        ) {
          lastTap.current = null;
          if (view.scale > 1) reset();
          else zoomTo(2.5, { x: e.clientX, y: e.clientY });
        } else {
          lastTap.current = { x: e.clientX, y: e.clientY, t: now };
        }
      } else if (
        e.pointerType !== "mouse" &&
        view.scale === 1 &&
        dt < 700 &&
        Math.abs(dx) > 60 &&
        Math.abs(dx) > Math.abs(dy) * 1.5
      ) {
        // Deslizar para cambiar de fotografía
        if (dx < 0) goNext();
        else goPrev();
      }
    }
    gestureMax.current = 0;
    start.current = null;
  };

  if (!isOpen || !image) return null;

  return (
    <div
      ref={rootRef}
      tabIndex={-1}
      className="viewer"
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
    >
      <div
        ref={stageRef}
        className={`viewer-stage${dragging ? " is-dragging" : ""}${
          view.scale > 1 ? " is-zoomed" : ""
        }`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onWheel={(e) =>
          zoomTo(view.scale * (e.deltaY < 0 ? 1.12 : 1 / 1.12), {
            x: e.clientX,
            y: e.clientY,
          })
        }
      >
        <img
          ref={imgRef}
          src={image.src}
          alt={image.alt}
          className="viewer-image"
          draggable={false}
          style={{
            transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.scale})`,
          }}
        />
      </div>

      <div className="viewer-caption">
        <span className="viewer-title">{image.alt}</span>
        <span className="viewer-count">Imagen {image.id}</span>
      </div>

      <button
        className="viewer-btn viewer-close"
        onClick={close}
        aria-label="Cerrar visor"
      >
        <Icon d="M6 6l12 12M18 6L6 18" />
      </button>

      <button
        className="viewer-btn viewer-arrow viewer-prev"
        onClick={goPrev}
        disabled={!hasPrev}
        aria-label="Fotografía anterior"
      >
        <Icon d="M15 5l-7 7 7 7" />
      </button>
      <button
        className="viewer-btn viewer-arrow viewer-next"
        onClick={goNext}
        disabled={!hasNext}
        aria-label="Fotografía siguiente"
      >
        <Icon d="M9 5l7 7-7 7" />
      </button>

      <div className="viewer-zoom">
        <button
          className="viewer-btn"
          onClick={() => zoomTo(view.scale - STEP)}
          disabled={view.scale <= MIN_SCALE}
          aria-label="Alejar"
        >
          <Icon d="M5 12h14" />
        </button>
        <button
          className="viewer-btn"
          onClick={() => zoomTo(view.scale + STEP)}
          disabled={view.scale >= MAX_SCALE}
          aria-label="Acercar"
        >
          <Icon d="M12 5v14M5 12h14" />
        </button>
      </div>
    </div>
  );
};

export default ImageViewer;