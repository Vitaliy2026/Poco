================================================================
  POCO GARAGE DOORS — HOSTINGER DEPLOYMENT GUIDE
  Port Coquitlam Garage Doors
  Final production build
================================================================

WHAT'S IN THIS PACKAGE
----------------------
  index.html              — Single-page site (all routes via showPage())
  .htaccess               — Apache config: HTTPS, www redirect, caching, gzip
  robots.txt              — Crawler rules (allows GPTBot, PerplexityBot, etc.)
  sitemap.xml             — Submit to Google Search Console
  site.webmanifest        — PWA manifest for "Add to Home Screen"
  favicon.svg / .png      — Browser tab icons
  apple-touch-icon.png    — iOS home-screen icon
  icon-192.png / 512.png  — Android home-screen icons
  images/                 — All site photography (compressed)
  brochures/              — PDF brochures (excluded from search)


UPLOAD TO HOSTINGER — STEP BY STEP
----------------------------------
1. Log in to Hostinger -> hPanel -> File Manager.

2. Open the "public_html" folder.

3. DELETE any default "index.html" or "default.php" Hostinger placed there.

4. Upload EVERY file and folder from this package directly into
   public_html/ (NOT inside a subfolder).

   public_html/
     |- index.html
     |- .htaccess
     |- robots.txt
     |- sitemap.xml
     |- favicon.svg
     |- favicon-16.png
     |- favicon-32.png
     |- apple-touch-icon.png
     |- icon-192.png
     |- icon-512.png
     |- site.webmanifest
     |- README.txt
     |- images/
     |- brochures/

   TIP: zip everything locally, upload the zip, then use File Manager's
        "Extract" option — much faster than per-file upload.

5. Confirm ".htaccess" was uploaded (it can be hidden).
   In File Manager: Settings (gear icon) -> "Show Hidden Files" -> ON.

6. Set file permissions if needed (Hostinger default is fine):
   - Folders: 755
   - Files:   644
   - .htaccess: 644


SSL / HTTPS
-----------
1. hPanel -> SSL -> install free Let's Encrypt SSL on your domain.
2. Wait until status = "Active" (5-15 min).
3. Open https://www.portcoquitlamgaragedoors.ca and confirm green padlock.
4. The .htaccess already forces HTTPS and www. Nothing else to do.


DNS — POINT THE DOMAIN
----------------------
If domain is bought elsewhere (GoDaddy, Namecheap, etc.):
  - Find Hostinger's nameservers in hPanel -> Domains.
  - Update at your registrar (propagation: 1-24 hours).

If domain bought through Hostinger: skip — it's already set up.


GOOGLE — SUBMIT YOUR SITE
-------------------------
1. https://search.google.com/search-console
2. Add property -> https://www.portcoquitlamgaragedoors.ca
3. Verify via DNS TXT record OR HTML file upload.
4. Sitemaps -> add "sitemap.xml" -> submit.
5. URL Inspection -> paste homepage URL -> "Request Indexing".

6. https://business.google.com (Google Business Profile)
   - Claim/create your listing.
   - Add website URL, hours, photos, service area.
   - Get verified (postcard or phone).
   - This is the #1 driver for "garage door repair near me" rankings.


BING — SUBMIT YOUR SITE
-----------------------
  https://www.bing.com/webmasters
  Import directly from Google Search Console (one click).


CHECK YOUR WORK
---------------
1. https://pagespeed.web.dev — paste your URL.
   Target: 85+ mobile, 95+ desktop.

2. https://search.google.com/test/rich-results — paste your URL.
   Should detect: LocalBusiness, FAQPage, HowTo, Service, Organization,
   WebSite, BreadcrumbList.

3. https://gtmetrix.com — Test from Vancouver (closest server).
   First Contentful Paint should be under 1.5s.

4. https://www.opengraph.xyz — paste URL.
   Check social-share preview looks right.

5. Open the site on your phone (real device, not desktop browser).
   - Tap phone number → should dial.
   - Tap address → should open Maps.
   - Submit contact form → should arrive in your inbox.


CONTACT FORM
------------
The "Get Free Estimate" form is currently FRONT-END ONLY.
To collect actual submissions you'll need ONE of:
  (a) Hostinger's built-in form handler (hPanel -> Email -> Forms)
  (b) A free Formspree.io / Web3Forms.io endpoint
  (c) A simple PHP mailer in /sendmail.php

Ask me when you're ready and I'll wire it up.


MAKING UPDATES LATER
--------------------
- Edit any file locally.
- Re-upload just the changed file via File Manager.
- Browser cache for HTML is only 1 hour, so updates appear fast.
- For images: keep filenames the same so cached versions update naturally,
  OR rename (e.g. hero-v2.jpg) to force fresh download.


TROUBLESHOOTING
---------------
Q: Site shows Hostinger placeholder page.
A: Delete default index files in public_html/. Our index.html must be there.

Q: Images broken / 404s.
A: Check that the entire "images" folder was uploaded with the same
   capitalization (Linux servers are case-sensitive: Logo.png != logo.png).

Q: HTTPS not working.
A: Wait for SSL to fully provision (up to 24h). Comment out the HTTPS
   redirect in .htaccess temporarily if needed.

Q: Form doesn't send.
A: See "CONTACT FORM" section above — needs a back-end handler.


================================================================
  Built and optimized for Hostinger shared hosting.
  Ready for production.
================================================================
