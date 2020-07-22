console.log('module')

const fun = async () => {
    return await Promise.resolve('hello')
}

fun().then(console.log)