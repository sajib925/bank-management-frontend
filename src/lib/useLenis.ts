import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

const useLenis = (): void => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => t,
      orientation: 'vertical',
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
};

export default useLenis;


// // hooks/useLenis.ts
// import { useEffect } from 'react';
// import Lenis from '@studio-freight/lenis';

// const useLenis = (): void => {
//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: .5,
//       easing: (t) => t,
//       orientation: 'vertical',
//     });

//     const onScroll = (event: Event) => {
//       event.preventDefault();
//     };

//     function raf(time: number) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);

//     // Prevent default scroll behavior
//     document.addEventListener('wheel', onScroll, { passive: false });

//     return () => {
//       lenis.destroy();
//       document.removeEventListener('wheel', onScroll);
//     };
//   }, []);
// };

// export default useLenis;
