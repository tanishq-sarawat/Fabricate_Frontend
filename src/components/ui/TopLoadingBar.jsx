import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

// Simple global event manager for loading progress
class LoadingEventManager {
  constructor() {
    this.listeners = new Set();
    this.activeRequests = 0;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify(event, payload) {
    this.listeners.forEach((listener) => listener(event, payload));
  }

  start() {
    this.activeRequests++;
    this.notify('start');
  }

  done() {
    this.activeRequests = Math.max(0, this.activeRequests - 1);
    if (this.activeRequests === 0) {
      this.notify('done');
    }
  }

  triggerQuick() {
    this.start();
    setTimeout(() => this.done(), 450);
  }
}

export const loadingBar = new LoadingEventManager();

export const TopLoadingBar = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  const completeAnimation = useCallback(() => {
    setProgress(100);
    const fadeTimer = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 250);

    return () => clearTimeout(fadeTimer);
  }, []);

  const startAnimation = useCallback(() => {
    setVisible(true);
    setProgress(20);

    const timer1 = setTimeout(() => {
      setProgress((prev) => (prev < 65 ? 65 : prev));
    }, 120);

    const timer2 = setTimeout(() => {
      setProgress((prev) => (prev < 85 ? 85 : prev));
    }, 280);

    const timerComplete = setTimeout(() => {
      completeAnimation();
    }, 600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timerComplete);
    };
  }, [completeAnimation]);

  // Trigger loading bar on route change
  useEffect(() => {
    startAnimation();
  }, [location.pathname, location.search, startAnimation]);

  // Subscribe to API / manual loading events
  useEffect(() => {
    return loadingBar.subscribe((event) => {
      if (event === 'start') {
        startAnimation();
      } else if (event === 'done') {
        completeAnimation();
      }
    });
  }, [startAnimation, completeAnimation]);

  if (!visible && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[99999] pointer-events-none transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden="true"
    >
      <div
        className="h-[2.5px] bg-[#f5cb39] transition-all duration-300 ease-out relative"
        style={{
          width: `${progress}%`,
          boxShadow: '0 0 10px rgba(245, 203, 57, 0.9), 0 0 5px rgba(245, 203, 57, 0.7)',
        }}
      >
        {/* Leading edge glow bead */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-r from-transparent to-white/70 blur-[1px]" />
      </div>
    </div>
  );
};

export default TopLoadingBar;
