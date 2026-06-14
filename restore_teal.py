import os

replacements = {
    '#5B34F2': '#1C6B72',
    '#5b34f2': '#1C6B72',
    '#4320C9': '#132E41',
    '#4320c9': '#132E41',
    '#F25F63': '#ED7B32',
    '#f25f63': '#ED7B32',
    '#0F6C7A': '#F5A844',
    '#0f6c7a': '#F5A844',
    '#DCE5EC': '#F0F4F8',
    '#dce5ec': '#F0F4F8'
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
print("Teal colors restored successfully.")
