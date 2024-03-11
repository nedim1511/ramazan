# Ramazan App

## Development
2) Pokreni `npm install --legacy-peer-deps`
3) Pokreni `export NODE_OPTIONS=--openssl-legacy-provider`
4) Pokreni `ionic serve`

## Build
1) Pokreni `export NODE_OPTIONS=--openssl-legacy-provider`
2) Pokreni `ng run app:build:production`
3) Pokreni `npx cap copy ios`
4) Pokreni `npx cap open ios`

## Release
1) Delete your Podfile.lock (I like to use the command '-rm -rf Podfile.lock' on the terminal for this)
2) Delete your Pods folder (I like to use the command '-rm -rf Pods' in the terminal for this)
3) Delete your .xcworkspace
4) Pod install
5) Clear your project into XCode> Product> Clean Build Folder
6) Change version and build number in XCode (info.plist)
7) Archive your project
8) Distribute your project
