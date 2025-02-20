import json
import os

def update_profile_data():
    profile_path = os.path.join("public", "resources", "profile_data.json")

    # Read the JSON file
    with open(profile_path, "r", encoding="utf-8") as file:
        data = json.load(file)

    image_extensions = {".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".tiff", ".svg", ".heif", ".avif"}

    # Process each project
    for project in data.get("projects", []):
        resource_dir = os.path.join("public", "resources", "projects", project["resource_directory"])
        print(f"Processing project: {resource_dir}")
        if os.path.exists(resource_dir) and os.path.isdir(resource_dir):
            project["screenshots"] = [
                f for f in os.listdir(resource_dir) 
                if os.path.isfile(os.path.join(resource_dir, f)) and os.path.splitext(f)[1].lower() in image_extensions
            ]
        else:
            project["screenshots"] = []  # If the directory doesn't exist, set it to an empty list

    # Write the updated JSON file back
    with open(profile_path, "w", encoding="utf-8") as file:
        json.dump(data, file, indent=2)

if __name__ == "__main__":
    update_profile_data()