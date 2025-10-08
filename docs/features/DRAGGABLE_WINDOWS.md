# Draggable Windows Feature

## ✅ Feature Added: Drag-and-Drop Windows!

Both the Terminal and Quick Commands Panel are now **fully draggable** like real desktop windows!

## 🖱️ How to Use

### Dragging Windows:
1. **Hover over a window** - Cursor changes to a "grab hand" (🖐️)
2. **Click and drag** from anywhere on the window
3. **Release** to drop the window in the new position
4. Windows have **constraints** to keep them visible on screen

### Best Drag Points:
- **Header bars** - Easiest place to grab
- **Anywhere on the window** - The entire window is draggable!

### Non-Dragging Areas:
These areas won't trigger dragging (they work normally):
- ✅ **Input field** in Terminal - Type without dragging
- ✅ **Scrollable content** - Scroll without dragging
- ✅ **Command buttons** - Click without dragging

## 🎨 Visual Feedback

### Cursor States:
- **Default**: `cursor-grab` (open hand 🖐️)
- **While Dragging**: `cursor-grabbing` (closed hand ✊)
- **Input Field**: `cursor-text` (I-beam cursor)

### Motion Effects:
- **Scales to 102%** while dragging (subtle lift effect)
- **Smooth animations** using framer-motion
- **Elastic boundaries** - slight bounce at constraints

## ⚙️ Technical Details

### Drag Properties:
```javascript
drag={true}                    // Enable dragging
dragMomentum={false}          // No inertia (stops immediately)
dragConstraints={{             // Boundaries
  top: -100,
  left: -300,
  right: 300,
  bottom: 100
}}
dragElastic={0.1}             // Slight elasticity at edges
whileDrag={{ 
  scale: 1.02,                // Grow slightly while dragging
  cursor: 'grabbing' 
}}
```

### Event Handling:
- `onPointerDown={(e) => e.stopPropagation()}` on interactive elements
- Prevents dragging when interacting with:
  - Input fields
  - Scrollable areas
  - Clickable buttons

## 🎯 Use Cases

1. **Organize Your Workspace**: Move windows to your preferred positions
2. **Compare Content**: Position windows side-by-side
3. **Personal Preference**: Customize your layout
4. **Fun Interaction**: Feels like a real desktop environment!

## 📱 Responsive Behavior

- **Desktop**: Full drag functionality enabled
- **Mobile**: Grid layout prevents overlap (dragging still works but less useful)

## 🎮 Window Management

### Both Windows Can:
- ✅ Be dragged independently
- ✅ Overlap each other
- ✅ Be positioned anywhere within constraints
- ✅ Maintain their functionality while moved

### Constraints Keep Windows:
- ✅ Mostly on screen (can peek off edges slightly)
- ✅ Draggable within reasonable bounds
- ✅ Always accessible

## 💡 Tips

1. **Drag from the header** for the most intuitive experience
2. **Windows remember their position** during the session
3. **Refresh the page** to reset positions
4. **Mobile users**: Single column layout is more practical

## 🔧 Files Modified

- ✅ `src/components/Terminal.jsx` - Added drag props, pointer event handling
- ✅ `src/components/QuickCommandsPanel.jsx` - Added drag props, pointer event handling

## 🎨 CSS Classes Added

- `cursor-grab` - Shows open hand when hovering
- `cursor-grabbing` - Shows closed hand while dragging
- `cursor-text` - Shows I-beam in input field

---

**Result**: Your portfolio now has a **desktop-like window management system**! 🪟✨

Drag the windows around and create your perfect workspace layout!
