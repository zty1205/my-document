import directive from './directive'
import keepAlive from './keep-alive'
import transition from './transition'
import isComponents from './isComponts'

export default [...directive, ...keepAlive, ...transition, ...isComponents]
