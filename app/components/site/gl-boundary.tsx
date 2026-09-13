"use client";

import { Component, type ReactNode } from "react";

/**
 * Error boundary for WebGL viewers: if a model or the GPU fails, the poster
 * underneath stays and the rest of the page keeps working. Never let a 3D
 * failure take down the site.
 */
export class GlBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.warn("3D viewer disabled:", error);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}