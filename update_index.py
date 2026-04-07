import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Smart Services GN
content = content.replace('Smart Services GN', 'OC Business Center')
content = content.replace('Smart Services', 'OC Business Center')
content = content.replace('Smart Service', 'OC Business Center')

# Replace Logo image URL
content = re.sub(
    r'https://imagedelivery\.net/[a-zA-Z0-9_\-]+/[a-zA-Z0-9\-]+/publicContain',
    'assets/logo.jpg',
    content
)

# Update Facebook link
content = re.sub(
    r'https://facebook\.com/[^\"]+',
    'https://web.facebook.com/profile.php?id=61585298978266',
    content
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done replacing base branding.")
