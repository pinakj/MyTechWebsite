# GeekyGoo - Tech Reviews & Gaming Blog

A modern, responsive tech blog website featuring gaming hardware reviews, budget-friendly gear guides, and industry insights. The site uses a beautiful tile-based layout with smooth animations and transitions.

## Features

- 🎮 Responsive tile-based layout
- ✨ Smooth page transition animations
- 📱 Mobile-friendly design
- 🎨 Gradient color schemes
- 🔍 Search functionality
- 📧 Newsletter subscription

## How to Add New Tiles

Adding new tiles to the blog grid is simple. Follow these steps:

### Step 1: Choose Your Tile Size

There are three tile sizes available:
- **Small** (`blog-tile small`) - 1x1 grid space
- **Medium** (`blog-tile medium`) - 2x1 grid space  
- **Large** (`blog-tile large`) - 3x1 grid space

### Step 2: Add the Tile HTML

Open `index.html` and locate the blog grid section (around line 67). Add your new tile within the `<div class="blog-grid">` element:

```html
<a href="posts/your-post-url.html" class="blog-tile [SIZE]">
    <div class="tile-image">
        <i class="fas fa-[ICON-NAME]"></i>
    </div>
    <h3>Your Tile Title</h3>
</a>
```

Replace:
- `[SIZE]` with `small`, `medium`, or `large`
- `[ICON-NAME]` with a Font Awesome icon name
- `your-post-url.html` with your post's URL
- `Your Tile Title` with your tile's title

### Example Tiles

#### Small Tile Example:
```html
<a href="posts/gaming-monitors.html" class="blog-tile small">
    <div class="tile-image">
        <i class="fas fa-tv"></i>
    </div>
    <h3>Best Gaming Monitors</h3>
</a>
```

#### Medium Tile Example:
```html
<a href="posts/gpu-guide.html" class="blog-tile medium">
    <div class="tile-image">
        <i class="fas fa-microchip"></i>
    </div>
    <h3>GPU Buying Guide 2025</h3>
</a>
```

#### Large Tile Example:
```html
<a href="posts/ultimate-setup.html" class="blog-tile large">
    <div class="tile-image">
        <i class="fas fa-gamepad"></i>
    </div>
    <h3>Ultimate Gaming Setup Guide</h3>
</a>
```

### Available Font Awesome Icons

Here are some commonly used icons for tech/gaming content:

- 🎮 Gaming: `fa-gamepad`, `fa-dice`, `fa-chess`
- 💻 Hardware: `fa-desktop`, `fa-laptop`, `fa-server`
- 🖱️ Peripherals: `fa-mouse`, `fa-keyboard`, `fa-headset`
- 📱 Mobile: `fa-mobile-alt`, `fa-tablet-alt`
- 🔊 Audio: `fa-headphones`, `fa-microphone`, `fa-volume-up`
- 📺 Display: `fa-tv`, `fa-desktop`, `fa-expand`
- 🔧 Tools: `fa-wrench`, `fa-cog`, `fa-tools`
- 💡 Other: `fa-lightbulb`, `fa-wifi`, `fa-ethernet`
- 🎬 Streaming: `fa-video`, `fa-camera`, `fa-stream`
- 💾 Storage: `fa-hdd`, `fa-database`, `fa-sd-card`

### Tile Colors

The tiles automatically cycle through three gradient color schemes:
1. Purple gradient (every 3rd tile starting from 1st)
2. Pink gradient (every 3rd tile starting from 2nd)
3. Blue gradient (every 3rd tile starting from 3rd)

### Best Practices

1. **Balance your layout**: Mix different tile sizes for visual interest
2. **Use relevant icons**: Choose icons that represent your content
3. **Keep titles concise**: Shorter titles work better, especially on small tiles
4. **Test responsiveness**: Check how your tiles look on mobile devices
5. **Maintain consistency**: Follow the existing naming conventions for URLs

### Creating Post Pages

When adding a new tile, you'll also need to create the corresponding post page:

1. Create a new HTML file in the `posts/` directory
2. Use `blog-post-template.html` as a starting point
3. Update the content, title, and metadata
4. Ensure the filename matches the href in your tile link

### File Structure

```
MyTechWebsite-main/
├── index.html          # Main page with tile grid
├── styles.css          # Main styles
├── blog-styles.css     # Tile-specific styles
├── animations.js       # Page transition animations
├── script.js           # Core functionality
└── posts/              # Blog post pages
    ├── blog-post-template.html
    └── [your-posts].html
```

## Customization

### Changing Tile Sizes

To adjust the default tile dimensions, edit `blog-styles.css`:

```css
.tile-image {
  width: 50px;    /* Adjust icon container width */
  height: 50px;   /* Adjust icon container height */
}

.tile-image i {
  font-size: 1.5em;  /* Adjust icon size */
}
```

### Modifying Grid Layout

The grid uses a 6-column layout on desktop. To change this, edit `blog-styles.css`:

```css
.blog-grid {
  grid-template-columns: repeat(6, 1fr);  /* Change 6 to your desired columns */
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

© 2025 GeekyGoo. All rights reserved.

## Need Help?

If you encounter any issues or need assistance adding tiles, check the existing tiles in `index.html` for reference examples.