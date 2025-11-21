---
title: Pison Space Program — Race Dash MFD
excerpt: A high‑performance multi‑function display for racing — live telemetry, configurable pages and crisp UI at speed.
date: 2025-11-10
cover: /portfolio/piston.svg
tags:
  - embedded
  - mfd
  - telemetry
  - racing
  - c++
  - tauri
client: Pison
---

When milliseconds matter and conditions are extreme, your dashboard needs to be bulletproof. We built a race dash multi-function display system from the ground up — firmware, software, and configuration tools.

## Chapter 1: Custom Firmware

We developed **proprietary firmware** specifically for racing MFDs. This isn't off-the-shelf hardware running generic software — this is purpose-built for the track.

The firmware handles:
- **Real-time telemetry ingestion** with zero-latency data processing
- **Robust sensor validation** with intelligent fallbacks when sensors fail
- **High refresh rate rendering** that stays smooth even under extreme vibration

## Chapter 2: The Widget System

At the heart of the display is our **C++ widget framework** — a modular system that gives teams complete flexibility over what they see and how they see it.

> Build custom dashboard layouts with drag-and-drop widgets. Lap times, gear position, oil pressure, throttle position — configure it exactly how you need it.

**Key features:**
- Modular page system with instant switching
- Persistent settings across sessions
- Custom theming for different lighting conditions
- Optimized rendering pipeline for buttery-smooth animations

## Chapter 3: Desktop Configuration

Configuring an MFD shouldn't require a degree in embedded systems. We built a **Tauri-based desktop application** that works on Windows, macOS, and Linux.

**What the app does:**
- Visual dashboard editor with live preview
- Widget library with pre-built components
- Theme customization for glare and night driving
- One-click deployment to the MFD hardware

The result? Race teams can customize their displays in the garage, test different layouts, and push updates to the car — all without writing a single line of code.
