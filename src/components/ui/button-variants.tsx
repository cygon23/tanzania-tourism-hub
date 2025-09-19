import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ButtonProps } from "@/components/ui/button";

// Hero button variant with tourism theme
export function HeroButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      className={cn(
        "bg-gradient-to-r from-safari to-ocean text-primary-foreground",
        "hover:from-safari-light hover:to-ocean-light",
        "shadow-lg hover:shadow-xl transition-all duration-300",
        "px-8 py-6 text-lg font-semibold rounded-xl",
        "border border-white/20 hover:border-white/30",
        className
      )}
      {...props}
    />
  );
}

// Safari themed button
export function SafariButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      className={cn(
        "bg-safari hover:bg-safari-light",
        "text-primary-foreground shadow-safari",
        "hover:shadow-lg transition-all duration-300",
        "border border-safari-dark/20",
        className
      )}
      {...props}
    />
  );
}

// Sunset themed button
export function SunsetButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      className={cn(
        "bg-sunset hover:bg-sunset-light",
        "text-accent-foreground shadow-sunset",
        "hover:shadow-lg transition-all duration-300",
        "border border-sunset-dark/20",
        className
      )}
      {...props}
    />
  );
}

// Ocean themed button
export function OceanButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      className={cn(
        "bg-ocean hover:bg-ocean-light",
        "text-primary-foreground shadow-ocean",
        "hover:shadow-lg transition-all duration-300",
        "border border-ocean-dark/20",
        className
      )}
      {...props}
    />
  );
}