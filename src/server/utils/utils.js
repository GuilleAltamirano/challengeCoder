import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.resolve(path.dirname(__filename), '..')
