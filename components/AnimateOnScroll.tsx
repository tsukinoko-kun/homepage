import { motion, useAnimation } from "framer-motion";
import type { ForwardRefComponent, HTMLMotionProps } from "framer-motion";
import { useEffect } from "react";
import type { ReactHTML } from "react";
import { useInView } from "react-intersection-observer";

type Props = {
  children: React.ReactNode;
  motionElement: typeof motion.section | typeof motion.li;
};

export const AnimateOnScroll = (props: Props) => {
  const inView = useInView({
    threshold: 0.2,
  });
  const anim = useAnimation();
  useEffect(() => {
    if (inView.inView) {
      anim.start({
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      });
    }
  }, [inView.inView]);

  return (
    <props.motionElement
      ref={inView.ref}
      initial={{ y: "5rem", opacity: 0, filter: "blur(6px)" }}
      animate={anim}
    >
      {props.children}
    </props.motionElement>
  );
};
