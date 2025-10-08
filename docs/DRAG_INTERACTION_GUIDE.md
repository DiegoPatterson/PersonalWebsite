# Draggable Windows - Visual Guide

## 🖱️ Interaction Map

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         🖐️ DRAGGABLE AREA                                │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │  [●][●][●]  NEXUS Terminal  🖐️ DRAG FROM HEADER               │    │
│  ├────────────────────────────────────────────────────────────────┤    │
│  │  🖐️ DRAG FROM HERE TOO                                         │    │
│  │  ┌──────────────────────────────────────────────────────────┐  │    │
│  │  │  📜 SCROLLABLE AREA (No drag)                            │  │    │
│  │  │  > Messages scroll independently                         │  │    │
│  │  │  > Content can be selected                               │  │    │
│  │  │                                                           │  │    │
│  │  └──────────────────────────────────────────────────────────┘  │    │
│  │  🖐️ DRAG FROM HERE TOO                                         │    │
│  ├────────────────────────────────────────────────────────────────┤    │
│  │  > |_  ⟵ TYPE HERE (No drag, normal input)                    │    │
│  └────────────────────────────────────────────────────────────────┘    │
│                         🖐️ DRAGGABLE AREA                                │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                         🖐️ DRAGGABLE AREA                                │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │  QUICK ACCESS  🖐️ DRAG FROM HEADER                            │    │
│  ├────────────────────────────────────────────────────────────────┤    │
│  │  🖐️ DRAG FROM SIDES                                            │    │
│  │  ┌──────────────────────────────────────────────────────────┐  │    │
│  │  │  📜 SCROLLABLE COMMANDS (No drag)                        │  │    │
│  │  │  [🎮 play game]  ⟵ CLICK TO EXECUTE                      │  │    │
│  │  │  [💼 experience]                                          │  │    │
│  │  │  [🎓 education]                                           │  │    │
│  │  │                                                           │  │    │
│  │  └──────────────────────────────────────────────────────────┘  │    │
│  │  🖐️ DRAG FROM SIDES                                            │    │
│  ├────────────────────────────────────────────────────────────────┤    │
│  │  💡 Footer tip                                                 │    │
│  └────────────────────────────────────────────────────────────────┘    │
│                         🖐️ DRAGGABLE AREA                                │
└─────────────────────────────────────────────────────────────────────────┘
```

## 🎬 Drag Animation Sequence

```
1. HOVER STATE
   ┌──────────┐
   │  Window  │  ← cursor: grab (🖐️)
   └──────────┘
   Normal size

2. GRAB (Mouse Down)
   ┌──────────┐
   │  Window  │  ← cursor: grabbing (✊)
   └──────────┘
   Normal size

3. DRAGGING (Mouse Move)
   ┌────────────┐
   │   Window   │  ← cursor: grabbing (✊)
   └────────────┘
   102% scale (subtle lift)
   Follows mouse

4. RELEASE (Mouse Up)
   ┌──────────┐
   │  Window  │  ← cursor: grab (🖐️)
   └──────────┘
   Snaps to 100% scale
   Stays at new position
```

## 🚧 Drag Constraints

```
                    Screen Boundary
    ┌─────────────────────────────────────────┐
    │                                         │
    │  ╔═══════════════════════════════╗     │
    │  ║  300px                        ║     │
-100px  ║←DRAG→   DRAGGABLE AREA    ←→║  300px
    │  ║  ZONE                         ║     │
    │  ╚═══════════════════════════════╝     │
    │             ↕ 100px                     │
    └─────────────────────────────────────────┘

Constraints:
• Top: -100px (can go up a bit)
• Left: -300px (can go left)
• Right: +300px (can go right)
• Bottom: +100px (can go down a bit)

Windows stay mostly on screen!
```

## 🎯 Click Zones

### Terminal Window:
```
┌─────────────────────────────────────┐
│ HEADER [Drag]                       │  ← Best grab point
├─────────────────────────────────────┤
│ [Drag]                              │
│   MESSAGES [Scroll + Select]        │  ← No drag when scrolling
│ [Drag]                              │
├─────────────────────────────────────┤
│ INPUT [Type]                        │  ← No drag when typing
└─────────────────────────────────────┘
  ^                                   ^
[Drag]                            [Drag]
```

### Quick Commands Panel:
```
┌─────────────────────────────────────┐
│ HEADER [Drag]                       │  ← Best grab point
├─────────────────────────────────────┤
│ [Drag]                              │
│   BUTTONS [Click]                   │  ← No drag when clicking
│   (scroll if needed)                │  ← No drag when scrolling
│ [Drag]                              │
├─────────────────────────────────────┤
│ FOOTER [Drag]                       │
└─────────────────────────────────────┘
  ^                                   ^
[Drag]                            [Drag]
```

## 💫 User Experience Flow

```
USER WANTS TO MOVE TERMINAL:

1. Hovers over Terminal
   ↓
   Cursor becomes 🖐️ (grab hand)
   
2. Clicks and holds
   ↓
   Cursor becomes ✊ (grabbing)
   Window scales up 2%
   
3. Moves mouse
   ↓
   Window follows smoothly
   Constrained to boundaries
   
4. Releases mouse
   ↓
   Window scales back to 100%
   Cursor becomes 🖐️ again
   Window stays in new position

SUCCESS! ✅
```

## 🎨 Visual States

### Normal State:
- Border: Standard (cyan or red)
- Shadow: Animated glow
- Cursor: `grab` (🖐️)
- Scale: 100%

### While Dragging:
- Border: Same
- Shadow: Enhanced
- Cursor: `grabbing` (✊)
- Scale: 102%

### In Scrollable Areas:
- Cursor: Default arrow or scroll
- Dragging: Disabled
- Scrolling: Enabled

### In Input Field:
- Cursor: `text` (I-beam)
- Dragging: Disabled
- Typing: Enabled

## 🎮 Try It Now!

1. **Hover** over the Terminal header → See the grab cursor
2. **Click and drag** → Watch it move!
3. **Try the Quick Commands Panel** → It moves too!
4. **Try typing** in the input → Typing works, no drag
5. **Try scrolling** messages → Scrolling works, no drag
6. **Try clicking buttons** → Buttons work, no drag

Perfect balance between **draggable windows** and **usable interfaces**! 🎯
