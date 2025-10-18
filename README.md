# Butter Café

A modern, full-featured café website with online ordering, table reservations, blog, and gallery. Built with React and designed for a seamless customer experience with persistent data using localStorage.

## Features

- **Online Ordering System**: Browse menu, place orders, track order status with countdown timer
- **Table Reservations**: Book tables with form validation and manage reservations
- **Order Tracking**: Real-time order status updates with pickup notifications
- **Order History**: View past orders and active orders separately
- **Blog System**: Read café news, events, and updates with tag filtering
- **Photo Gallery**: Browse café photos with smooth hover effects
- **User Authentication**: Register/Login system with form validation
- **Guest Browsing**: Browse without account (limited features)
- **Responsive Design**: Mobile-friendly with off-canvas navigation
- **Form Validation**: Joi validation for all user inputs
- **SEO Optimized**: React Helmet for meta tags and descriptions
- **Smooth Animations**: Elegant UI transitions and effects

## Tech Stack

- **Frontend**: React 18 with Vite
- **Routing**: React Router DOM v7
- **Styling**: Bootstrap 5 + Custom CSS
- **Validation**: Joi for form validation
- **SEO**: React Helmet Async
- **Storage**: LocalStorage for data persistence
- **Build Optimization**: Vite with PurgeCSS plugin

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Modern browser with localStorage support

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd butter
```

2. Install dependencies:
```bash
npm install
```

3. Ensure you have the required static assets:
   - `/public/Images/` - All images for pages, products, gallery
   - `/public/Fonts/` - Custom fonts (Roboto)
   - `/public/API.json` - Drinks/menu data
   - `/public/POSTS.json` - Blog posts data
   - `/public/Gallery.json` - Gallery images data

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── Components/
│   ├── Blog/
│   │   ├── Blog.jsx              # Blog page with filtering
│   │   └── Blog.css
│   ├── CurrentReservations/
│   │   ├── UserRes.jsx           # View/cancel reservations
│   │   └── CurrentReservations.css
│   ├── Error_404/
│   │   ├── Error_404.jsx         # 404 error page
│   │   └── Error_404.css
│   ├── Footer/
│   │   ├── Footer.jsx            # Site footer
│   │   └── Footer.css
│   ├── Gallery/
│   │   ├── Gallery.jsx           # Photo gallery
│   │   └── Gallery.css
│   ├── Home/
│   │   ├── Home.jsx              # Main landing page
│   │   ├── Home.css
│   │   ├── Welcome/              # Welcome section
│   │   ├── Special_menu/         # Special menu section
│   │   ├── Ordering/             # Quick order section
│   │   ├── Call/                 # CTA section
│   │   ├── BlogPart/             # Blog preview
│   │   └── Slider/               # Hero slider
│   ├── Layout/
│   │   └── Layout.jsx            # Main layout wrapper
│   ├── LoadingSpinner/
│   │   ├── LoadingSpinner.jsx    # Loading component
│   │   └── LoadingSpinner.css
│   ├── Login/
│   │   ├── Login.jsx             # Login page
│   │   └── Login.css
│   ├── Navbar/
│   │   ├── Navbar.jsx            # Navigation with offcanvas
│   │   └── Navbar.css
│   ├── Orders/
│   │   ├── Orders.jsx            # Order tracking & history
│   │   └── Orders.css
│   ├── PostsSlider/
│   │   ├── PostsSlider.jsx       # Testimonials carousel
│   │   └── PostsSlider.css
│   ├── Register/
│   │   ├── Register.jsx          # Registration with validation
│   │   └── Register.css
│   ├── Reservations/
│   │   ├── Reservations.jsx      # Table booking form
│   │   └── Reservations.css
│   ├── Shop/
│   │   ├── Shop.jsx              # Full menu/shop page
│   │   └── Shop.css
│   └── UpBtn/
│       └── UpBtn.jsx             # Scroll to top button
├── App.jsx                       # Main app with routing
├── Fonts.css                     # Custom font definitions
├── index.css                     # Global styles
└── main.jsx                      # App entry point
```

## Data Structure

### API.json (Menu Items)

```json
[
  {
    "id": 1,
    "name": "Cappuccino",
    "description": "Rich espresso with steamed milk",
    "price": 4.50,
    "image": "/Images/drink1.jpg",
    "tag": "Cappucino",
    "home": true,
    "special": false
  }
]
```

### POSTS.json (Blog Posts)

```json
[
  {
    "id": 0,
    "title": "Coffee Culture",
    "content": "Full post content...",
    "short": "Brief description...",
    "creator": "Admin",
    "date": "Jan 15, 2024",
    "time": "10:00 AM",
    "image": "/Images/post1.jpg",
    "comments_counter": 5,
    "tags": "coffee,culture",
    "recent": true,
    "home": true
  }
]
```

### Gallery.json (Gallery Images)

```json
[
  {
    "id": 1,
    "image": "/Images/gallery1.jpg",
    "home": true
  }
]
```

### LocalStorage Structure

**User Registration**:
```json
{
  "User_Reg_Data": [
    {
      "fullName": "John Doe",
      "username": "johndoe",
      "email": "john@example.com",
      "password": "password123"
    }
  ]
}
```

**Login Session**:
```json
{
  "login": {
    "username": "johndoe"
  }
}
```

**Orders**:
```json
{
  "orderedDrinks": {
    "johndoe": [
      {
        "id": 1,
        "name": "Cappuccino",
        "price": 4.50,
        "image": "/Images/drink1.jpg",
        "description": "...",
        "startTime": 1640000000000,
        "duration": 300,
        "orderNumber": 1234
      }
    ]
  }
}
```

**Order History**:
```json
{
  "orderHistory": {
    "johndoe": [
      {
        "id": 1,
        "name": "Cappuccino",
        "status": "Received"
      }
    ]
  }
}
```

**Reservations**:
```json
{
  "User_Reservations": [
    {
      "FullName": "John Doe",
      "Phone": "12345678901",
      "Guests": "4",
      "Date": "2024-12-25",
      "additional_notes": "Window seat please"
    }
  ]
}
```

## Key Features Explained

### User Authentication

Registration with Joi validation:
```javascript
const schema = Joi.object({
  fullName: Joi.string()
    .pattern(/^[a-zA-Z]{1}[a-zA-Z ]{4,19}$/)
    .required(),
  username: Joi.string()
    .pattern(/^[a-zA-Z]{1}[a-zA-Z0-9!@#$%^&*()_+=-]{4,19}$/)
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .pattern(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*()_+=-]{5,20}$/)
    .required()
});
```

**Validation Rules**:
- Full Name: 5-20 letters, no numbers/symbols
- Username: 5-20 characters, letters and numbers
- Email: Valid email format
- Password: 5-20 characters, must include at least one number

### Order System with Timer

Orders include a countdown timer:
```javascript
const newOrder = {
  ...drink,
  startTime: Date.now(),
  duration: 300, // 5 minutes in seconds
  orderNumber: Math.floor(Math.random() * 10000) + 1
};
```

Timer calculation:
```javascript
const getRemainingTime = (order) => {
  const now = Date.now();
  const endTime = new Date(order.startTime).getTime() + order.duration * 1000;
  return Math.max(Math.floor((endTime - now) / 1000), 0);
};
```

**Order Flow**:
1. User places order → Timer starts (5 minutes)
2. Status: "Pending" → Countdown shows remaining time
3. Timer expires → Status: "Waiting to Pick Up"
4. User marks as received → Moves to Order History

### Table Reservations

Form validation with Joi:
```javascript
const schema = Joi.object({
  FullName: Joi.string()
    .pattern(/^[a-zA-Z]{1}[a-zA-Z ]{4,19}$/)
    .required(),
  Phone: Joi.string()
    .pattern(/^\d{11}$/)
    .required(),
  Guests: Joi.number().integer().min(1).max(30).required(),
  Date: Joi.date().iso().greater("now").required(),
  additional_notes: Joi.string().max(200).allow("").optional()
});
```

**Reservation Features**:
- Real-time validation
- Future date enforcement
- Guest count limits (1-30)
- Optional notes (max 200 chars)
- View and cancel reservations

### Blog Tag Filtering

Dynamic tag-based filtering:
```javascript
const handleTagClick = (tag) => {
  setSelectedTag(tag);
  if (tag === "all") {
    setFilteredPosts(posts);
  } else {
    setFilteredPosts(posts.filter((post) => post.tags.includes(tag)));
  }
};
```

**Available Tags**: All, Business, Coffee, Drink, Food, Sweet

### Responsive Navigation

Desktop: Full horizontal navbar
Mobile: Off-canvas sidebar with hamburger menu

```javascript
// Toggles automatically based on screen size via CSS media queries
@media screen and (max-width: 992px) {
  .outer { display: none; }
  .offCanTrigger { display: block; }
}
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Authentication Flow

### Registration
1. Fill registration form
2. Joi validates inputs
3. Check username/email uniqueness
4. Save to localStorage
5. Redirect to login

### Login
1. Enter credentials
2. Validate against stored users
3. Set login session
4. Redirect to home

### Logout
1. Remove login session
2. Redirect to login page

### Guest Mode
- Browse all pages
- Cannot place orders
- Cannot make reservations
- Prompted to login when needed

## Page-by-Page Functionality

### Home Page
- Hero slider (3 slides)
- Welcome section
- Special menu preview
- Quick order section (featured drinks)
- Call-to-action for reservations
- Blog preview (3 recent posts)

### Shop Page
- Full menu categorized by drink type
- Cappuccinos section
- Iced Coffees section
- Order button for each item
- Link to orders page

### Orders Page
- **Active Orders**: Current orders with countdown
- **Order History**: Completed orders
- Mark as received button
- Cancel order option

### Reservations Page
- Reservation form with validation
- View current reservations
- Cancel reservation option
- Link to reservations page

### Blog Page
- All blog posts
- Tag filtering
- Working hours sidebar
- Post details (date, author, comments)

### Gallery Page
- Grid layout of photos
- Hover effects
- Testimonials slider

## SEO & Meta Tags

Each page includes custom meta tags:
```javascript
<Helmet>
  <title>Butter - Page Name</title>
  <meta name="description" content="Page description" />
</Helmet>
```

## Styling System

### CSS Variables
```css
:root {
  font-size: 16px; /* Desktop */
}

@media screen and (max-width: 992px) {
  :root {
    font-size: 14px; /* Mobile */
  }
}
```

### Color Scheme
- Primary Orange: `#fd8f00`
- Dark: `#303030`
- Gray: `#494646`
- Light Gray: `#b6b6b6`
- White: `#fff`
- Red: `#fd0000`

### Custom Fonts
- Regular: Roboto-Regular
- Bold: Roboto-Bold
- Thin: Roboto-Thin

## Form Validation Messages

### Full Name
- ✅ 5-20 letters only
- ❌ "Full name must be 5-20 letters long and contain no numbers or special characters"

### Username
- ✅ 5-20 characters, letters/numbers
- ❌ "Username must be 5-20 characters long and can include numbers or special characters"

### Email
- ✅ Valid email format
- ❌ "Invalid email format"

### Password
- ✅ 5-20 characters, at least one number
- ❌ "Password must be 5-20 characters long and include at least one number"

### Phone
- ✅ Exactly 11 digits
- ❌ "Phone number must be 10 digits long"

### Guests
- ✅ 1-30 guests
- ❌ "Guests must be between 1 and 30"

### Date
- ✅ Future date
- ❌ "Date must be in the future"

## Browser Support

Modern browsers with:
- ES6+ JavaScript
- LocalStorage support
- CSS Grid and Flexbox

Tested on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Known Limitations

- No backend server (all data in localStorage)
- No real payment processing
- No email confirmations
- Orders/reservations not persistent across devices
- No user profile pages
- No password reset functionality
- Limited to one device per user session

## Future Enhancements

- [ ] Backend API integration
- [ ] Real payment gateway
- [ ] Email notifications
- [ ] User profiles with order history
- [ ] Password reset via email
- [ ] Reviews and ratings system
- [ ] Loyalty points program
- [ ] Push notifications for orders
- [ ] Real-time availability for reservations
- [ ] Menu item customization
- [ ] Delivery option
- [ ] Multi-language support
- [ ] Admin dashboard
- [ ] Analytics integration

## Performance Optimization

- Lazy loading for routes with React.lazy()
- Code splitting with Vite
- PurgeCSS for unused CSS removal
- Image optimization recommended
- Suspense boundaries for loading states

## Deployment

Build for production:
```bash
npm run build
```

Deploy the `dist` folder to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

## Troubleshooting

### Orders Not Showing
- Check localStorage in browser DevTools
- Verify user is logged in
- Ensure `orderedDrinks` key exists

### Images Not Loading
- Verify images exist in `/public/Images/`
- Check image paths in JSON files
- Ensure correct file extensions

### Forms Not Validating
- Check Joi schema definitions
- Verify input names match schema keys
- Check console for validation errors

### LocalStorage Issues
- Check browser privacy settings
- Clear localStorage and try again
- Verify localStorage is enabled

## Development Tips

### Adding New Drinks
1. Add to `/public/API.json`
2. Include required fields: id, name, price, image, tag
3. Refresh page to see changes

### Adding Blog Posts
1. Add to `/public/POSTS.json`
2. Include all required fields
3. Set `home: true` for homepage display

### Custom Styling
- Modify component CSS files
- Use Bootstrap utility classes
- Follow existing color scheme

## Contributing

1. Fork the repository
2. Create a feature branch
3. Follow existing code style
4. Test thoroughly
5. Commit your changes
6. Push to the branch
7. Open a pull request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Bootstrap for responsive framework
- Joi for validation
- React Helmet for SEO
- Font Awesome for icons
- React Router for navigation
- Vite for fast build tooling

---

**Note**: This is a demo project using localStorage. For production use, implement a proper backend with database, authentication, and payment processing.
