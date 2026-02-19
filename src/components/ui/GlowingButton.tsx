import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface GlowingButtonProps extends React.ComponentProps<typeof Button> {
    glowColor?: string;
}

const GlowingButton = React.forwardRef<HTMLButtonElement, GlowingButtonProps>(
    ({ className, glowColor = "rgba(56, 189, 248, 0.6)", children, ...props }, ref) => {
        return (
            <div className="relative group">
                <motion.div
                    className="absolute -inset-0.5 rounded-lg opacity-75 blur-md group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
                    style={{ background: `linear-gradient(to right, ${glowColor}, #a855f7, ${glowColor})` }}
                    animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
                <Button
                    ref={ref}
                    className={cn(
                        "relative flex items-center bg-black text-white hover:bg-black/90 border border-slate-800",
                        className
                    )}
                    {...props}
                >
                    {children}
                </Button>
            </div>
        );
    }
);

GlowingButton.displayName = "GlowingButton";

export default GlowingButton;
