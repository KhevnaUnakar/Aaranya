import { Component } from "react";

export default class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    // Non-fatal: the 3D layer is a progressive enhancement, so we simply
    // log and fall back to the static visual rather than breaking the page.
    console.warn("3D scene failed to render — falling back to static visual.", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
