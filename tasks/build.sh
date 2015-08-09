rm -rf build

# npm CJS
babel -d build/lib ./lib
cp README.md package.json build

echo "\nnpm build including deps is\n `bro-size build`"
echo "\nnpm build excluding deps is\n `bro-size build -u react`"
