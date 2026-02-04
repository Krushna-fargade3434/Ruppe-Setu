# Version Management Guide

## How It Works

The app version is automatically managed and displayed throughout the application:

### Version Display Locations
1. **Profile Page** - Shows app name and version with auto-update indicator
2. **Header Dropdown** - Version number displayed at the bottom of user menu
3. **Automatic Updates** - Version updates on every Vercel deployment

## Updating the Version

### Method 1: Automatic (Recommended)
When you deploy to Vercel, the version is automatically updated:
```bash
npm run build  # This updates version.ts automatically
```

### Method 2: Manual Update
1. Update version in `package.json`:
```json
{
  "version": "1.1.0"  // Change this
}
```

2. Run the update script:
```bash
npm run version:update
```

## Version Format
Follow semantic versioning (MAJOR.MINOR.PATCH):
- **MAJOR** (1.x.x) - Breaking changes
- **MINOR** (x.1.x) - New features (backwards compatible)
- **PATCH** (x.x.1) - Bug fixes

## Examples
- `1.0.0` - Initial release
- `1.1.0` - Added monthly expense tracking
- `1.1.1` - Fixed profile page bug
- `2.0.0` - Major redesign

## Vercel Deployment
Every time you push to your repository:
1. Vercel automatically builds the app
2. Build script runs `update-version.js`
3. Version and build timestamp are embedded
4. Users see the updated version immediately

No manual intervention needed! Just update the version number in `package.json` when you want to release a new version.
