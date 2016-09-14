import requireDirectory from 'require-directory';

export const importDeepFiles = (module, relativePath, fileName) => {
  const modules = requireDirectory(module, relativePath, {
    visit: m => m.default,
    include: new RegExp(`${fileName}\\.js$`),
    recurse: true,
  });
  for (const key of Object.keys(modules)) {
    modules[key] = modules[key][fileName];
  }
  return modules;
};
