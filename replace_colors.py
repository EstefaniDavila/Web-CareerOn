import os

replacements = {
    '#1D9E75': '#5B34F2',
    '#1d9e75': '#5B34F2',
    '#0F6E56': '#4320C9',
    '#0f6e56': '#4320C9',
    '#E1F5EE': '#DCE5EC',
    '#e1f5ee': '#DCE5EC',
    '#E8F0F0': '#DCE5EC',
    '#ECFDF5': '#DCE5EC',
    '#F0EDFC': '#DCE5EC',
    '#f0edfc': '#DCE5EC'
}

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith('.jsx') or file.endswith('.css') or file.endswith('.js'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content
            for old, new in replacements.items():
                new_content = new_content.replace(old, new)
                
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
print("Colors restored successfully.")
