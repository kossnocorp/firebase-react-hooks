import * as fs from 'fs'
import { resolve } from 'path'
import { promisify } from 'util'

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const rootPath = process.cwd()
const packageJSONPath = resolve(rootPath, 'lib/react/package.json')
const adaptorPackageJSONPath = resolve(
  rootPath,
  'lib/react/adaptor/package.json'
)
const esmAdaptorPackageJSONPath = resolve(
  rootPath,
  'lib/react/esm/adaptor/package.json'
)

Promise.all([
  readFile(packageJSONPath, 'utf8')
    .then(JSON.parse)
    .then(packageJSON =>
      writeFile(
        packageJSONPath,
        JSON.stringify(patchPackageJSON(packageJSON), null, 2)
      )
    ),

  writeFile(
    adaptorPackageJSONPath,
    JSON.stringify(
      {
        main: './react',
        module: '../esm/adaptor/preact.js',
        sideEffects: false
      },
      null,
      2
    )
  ),

  writeFile(
    esmAdaptorPackageJSONPath,
    JSON.stringify({ main: './react' }, null, 2)
  )
]).catch(err => {
  console.error(err)
  process.exit(1)
})

type PackageJSON = {
  peerDependencies: { [key: string]: string }
  [key: string]: any
}

function patchPackageJSON(packageJSON: PackageJSON): PackageJSON {
  return Object.assign({}, packageJSON, {
    peerDependencies: Object.assign({}, packageJSON.peerDependencies, {
      react: '*'
    })
  })
}
