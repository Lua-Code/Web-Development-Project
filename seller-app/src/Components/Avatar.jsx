"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

export function Avatar({ className = "", ...props }) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}
      {...props}
    />
  );
}

export function AvatarImage({ className = "", ...props }) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={`aspect-square w-full h-full ${className}`}
      {...props}
    />
  );
}

export function AvatarFallback({ className = "", ...props }) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={`bg-muted flex w-full h-full items-center justify-center rounded-full ${className}`}
      {...props}
    />
  );
}
