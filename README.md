# Description

This package is made by [Сосукевич Павел Николаевич](https://github.com/retueZe) &lt;<retueze@gmail.com>&gt; exclusively for [SOFTAREX Technologies](https://softarex.com/).

# Usage

To start a dev-server run

```powershell
scripts\dev
```

To build this package with development configuration run

```powershell
scripts\build
```

and to build this package with production configuration run

```powershell
scripts\build -p
```

# Configurations

All the scripts simply wraps the `npx snowpack` command. The development configuration is stored at `snowpack.config.dev.mjs`, and the production one is stored at `snowpack.config.prod.mjs`. The production configuration builds the project in a `dist` directory bundled and minified. All the directories are mounted as-is except the `www` folder which is mounted at the root. The development configuration reduces the optimizations of the production build.

# Contents

The `components` folder contains `.tsx` files representing a component having the same name and exporting it as a default export. The `styles` folder contains `.sass` files attached to matching `.tsx` file. React is importing by the first line of `.tsx` file, and the matching style is by the second one. There are also a couple of subfolders: `pages`, and `layouts`. Layouts are always the result of page rendering and they know that they will be stored in the root element, so, they can use the `React.Fragment` component as their rendering result. The `pages` subfolder also contains an `index.ts` file which is imported in the `App.tsx` file to approach the `pages` subfolder like a module. The `App` component will always be, renders in the `www/index.tsx` file, creates initiates Redux, and routes pages. The `App.sass` file contains basic CSS preambule and a couple of CSS classes for better DX: `hidden` and `collapsed` which are representing the state of a potential user. There may be some conflicts between local class and global class, so, class users should use SASS anchors to explicitly override the behaviour.

A `store.ts` file, the core of Redux, is stored in the `app` folder and have a default export, the Redux store. The `slices` subfolder contains slices named `&lt;file name&gt;Slice` and exported as a default export. Same with the `sagas` and `hooks` folder. There is also an `api` Each of these folders also contains one `index.ts` file used by the `store.ts` file.

## Slices

`photos`, `headerPhoto`, `searchFilter`, `user`, and `errors` slices have been configured.

The main content of the `photos` slice is a photo dictionary, and their order (ID array). It also contains a page capacity that can be configured only when there is no downloading completed and represents amount of downloading photos per page.

The `headerPhoto` slice is used by `DefaultLayout` to store its header photo. It has the same downloading mechanics as the `photos` slice.

The `searchFilter` slice contains filters for the `SearchPage` such as `query`, `orientation`, `size`, and `color`. Changes should be represented in the URL`s query of the `SearchPage`. Icons of `orientation` and `size` filters are stored in the matching assetss subfolders.

The `user` slice contains stored in local storage user-specific data such as `language` and `likes`. The `language` property is a language used in a `assets/localization.json` file.

The `errors` slice is just a list of errors which should be shown to the user as notifications. As these errors are unique objects, they are identified by their own references.

## Hooks

The biggest part of all the hooks are `use<slice name>` hooks which are depended on the `useSlice` hook. It takes a slice name and a selector for its state. The first returned value is selected state, and the second one is a used slice. Used slices are object containing slice state, slice name, and also a `dispatch` method which accepts type of action as a first arg and its payload as a second arg.

There is also a `useScrollPosition` hook returning scroll position snapshots. Scroll position snapshot is an object containing scorll position in pixels and percents, 2 flags indicating is scroll in one of the extreme positions, and a helper function helps to determine if the scroll has reached some position or not.
