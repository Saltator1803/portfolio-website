import os
import shutil

src_dir = "temp-next-app"
dest_dir = "."

if not os.path.exists(src_dir):
    print("Error: temp-next-app does not exist!")
    exit(1)

# Helper function to merge directories
def merge_dirs(src, dest):
    os.makedirs(dest, exist_ok=True)
    for item in os.listdir(src):
        s = os.path.join(src, item)
        d = os.path.join(dest, item)
        if os.path.isdir(s):
            merge_dirs(s, d)
        else:
            if os.path.exists(d):
                os.remove(d)
            shutil.move(s, d)

# Move all items
for item in os.listdir(src_dir):
    s = os.path.join(src_dir, item)
    d = os.path.join(dest_dir, item)
    if os.path.isdir(s):
        if item == "public":
            # merge public to preserve our extracted zip frames
            merge_dirs(s, d)
        else:
            # for src, node_modules, etc.
            if os.path.exists(d):
                if os.path.isdir(d):
                    shutil.rmtree(d)
                else:
                    os.remove(d)
            shutil.move(s, d)
    else:
        if os.path.exists(d):
            os.remove(d)
        shutil.move(s, d)

# Remove the temp-next-app directory which should now be empty
shutil.rmtree(src_dir)
print("Files successfully moved from temp-next-app to root. temp-next-app directory deleted.")
