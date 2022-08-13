const fs = require('fs');

module.exports = async (req) => {

    const { client } = req;

    const load_dir = (dirs) => {
    const command_files = fs.readdirSync(`./commands/${dirs}`).filter(file => file.endsWith('.js'));

    for(const command_file of command_files){
        const command = require(`../commands/${dirs}/${command_file}`);
        if(command.name){
            client.commands.set(command.name, { ...command,file: command_file });
        } else {
            continue;
        }
    }
}
['Games', 'artists', 'Economy'].forEach(e => load_dir(e));
    
}