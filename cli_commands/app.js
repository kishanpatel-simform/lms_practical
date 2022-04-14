// const ut = require('./utils.js')
// const answer = ut(10, 2)
// console.log(answer)

// const notes = nt()
// console.log(notes)
// console.log(validator.isEmail("k8'or1'@gmail.com"))

// console.log(process.argv)
// console.log(process.argv[2])

//const validator = require('validator')
const notes = require('./notes')
const yargs = require('yargs')
const { demandOption, argv } = require('yargs')

// Add Command 

yargs.command({
    command: 'add',
    describe: 'To add Notes',
    builder: {
        title: {
            describe: 'Title of Notes',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Body of Notes',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.addNotes(argv.title, argv.body)
    }
})

// Remove Command

yargs.command({
    command: 'remove',
    describe: 'To remove Notes',
    builder: {
        title: {
            describe: 'Title of Notes',
            demandOption: true,
            type: 'string'
        }
    },
    handler: () => {
        notes.removeNotes(argv.title)
    }
})

// Read a Command

yargs.command({
    command: 'read',
    describe: 'To read Notes',
    builder: {
        title: {
            describe: 'Title of Notes',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.readNote(argv.title)
    }
})

// List Command

yargs.command({
    command: 'list',
    describe: 'To list a Notes',
    handler: () => {
        notes.listNotes()
    }
})
yargs.parse()
    //console.log(yargs.argv)

/*
const command = process.argv[2]
if (command === "add") {
    console.log("Added Note!")
} else if (command === "remove") {
    console.log("Removed Note!")
} else if (command === "update") {
    console.log("Updated Note!")
}

*/