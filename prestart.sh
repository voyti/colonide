rm -rf ./dist/
babel src -d dist -s
ln -sf ./node_modules ./dist/
cp -R src/index.html dist/index.html
cp -R src/resources dist/resources