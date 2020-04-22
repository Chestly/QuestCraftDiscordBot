const discord = require('discord.js');
const { prefix, token, pin } = require('./config.json');
const client = new discord.Client();

const messagesJS = require('./messages');
const serverContact = require('./serverContact');

let applicationChannel;

client.once("ready", () => {
    console.log("ready");
    applicationChannel = client.channels.cache.get('690353711628943714');
  
    

})
client.on('guildMemberAdd', member => {
    client.channels.cache.get('589600843909824563').send("<@" + member.id + "> Thanks for Joining QuestCraft! To apply for ingame Perms please to go questcraft.net/apply.html. If you have any questions be sure to ask Staff!"); 
});
client.on("message", message => {
    const args = message.content.split(" ");
    if (message.channel.id == applicationChannel.id) {

        if (args[0] == `${prefix}requestApp`) {
        } else if (args[0] == `${prefix}postApp`) {
        }
    }
})

function sendDM (discordUsername) {
    const discordUser = discordUsername.substr(0, discordUsername.indexOf("#"));
    const discordDiscriminator = discordUsername.substr(discordUsername.indexOf("#") + 1, discordUsername.length - 1);
    const dmUser = client.users.cache.find(member => member.username === discordUser && member.discriminator === discordDiscriminator)
    return dmUser;
}

function sendRatedApp(app) {
    let currentStatus = 0
    let votes = 0;

    const appMessage = messagesJS.getPlayerMessage(app.mcUsername, app.discordUsername, app.questions, app.mcUsername, currentStatus);

    applicationChannel.send("<@589897267696107526> " + appMessage).then(function (returnMesage) {
        returnMesage.react('👍');
        returnMesage.react('👎');
        //console.logconsole.log(returnMesage);
        const messageID = returnMesage.id;

        client.on("messageReactionAdd", (reaction, user) => {
            if (user.bot == false && reaction.message.id == messageID) {
                let editedMessage;
                if (reaction.emoji.name === '👍') {
                    serverContact.contactServer("modifyStatus", { "pin": pin, "status": 1, "mcUsername": app.mcUsername }, function (response) {
                        console.log("got into the function!")
                        votes++;
                        if (Object.keys(response)[0] == "ErrorClass") {
                            const errorMessage = response[Object.keys(response)[0]].message;
                            const errorCode = response[Object.keys(response)[0]].errorCode;
                            applicationChannel.send(messagesJS.getErrorMessage(errorMessage, errorCode));
                        } else {

                            const currentStatus = response[Object.keys(response)[0]];
                            if (currentStatus >= 4 && votes >= 4) {
                                editedMessage = messagesJS.getPlayerMessage(app.mcUsername, app.discordUsername, app.questions, app.mcUsername, "Approved");
                                applicationChannel.send(messagesJS.getApproved(app.mcUsername, currentStatus, app.discordUsername));
                                const appliedUser = sendDM(app.discordUsername);
                                if (appliedUser != null) {
                                    appliedUser.send(messagesJS.sendDM(app.mcUsername, currentStatus, "Approved"));
                                }
                            } else if (currentStatus <= 0 && votes >= 4) {
                                editedMessage = messagesJS.getPlayerMessage(app.mcUsername, app.discordUsername, app.questions, app.mcUsername, "Denied");
                                applicationChannel.send(messagesJS.getDenied(app.mcUsername, currentStatus, app.discordUsername));
                            } else {
                                editedMessage = messagesJS.getPlayerMessage(app.mcUsername, app.discordUsername, app.questions, app.mcUsername, currentStatus)
                            }
                            returnMesage.edit(editedMessage);
                        }
                    });
                } else if (reaction.emoji.name === '👎') {
                    serverContact.contactServer("modifyStatus", { "pin": pin, "status": -1, "mcUsername": app.mcUsername }, function (response) {
                        votes++;
                        if (Object.keys(response)[0] == "ErrorClass") {
                            const errorMessage = response[Object.keys(response)[0]].message;
                            const errorCode = response[Object.keys(response)[0]].errorCode;
                            applicationChannel.send(messagesJS.getErrorMessage(errorMessage, errorCode));

                        } else {

                            const currentStatus = response[Object.keys(response)[0]];
                            if (currentStatus >= 4 && votes >= 4) {
                                editedMessage = messagesJS.getPlayerMessage(app.mcUsername, app.discordUsername, app.questions, app.mcUsername, "Approved");
                                applicationChannel.send(messagesJS.getApproved(app.mcUsername, currentStatus, app.discordUsername));
                            } else if (currentStatus <= 0 && votes >= 4) {
                                editedMessage = messagesJS.getPlayerMessage(app.mcUsername, app.discordUsername, app.questions, app.mcUsername, "Denied");
                                applicationChannel.send(messagesJS.getDenied(app.mcUsername, currentStatus, app.discordUsername));
                                const appliedUser = sendDM(app.discordUsername);
                                if (appliedUser != null) {
                                    appliedUser.send(messagesJS.sendDM(app.mcUsername, currentStatus, "Denied"));
                                }
                            } else {
                                editedMessage = messagesJS.getPlayerMessage(app.mcUsername, app.discordUsername, app.questions, app.mcUsername, currentStatus)
                            }
                            returnMesage.edit(editedMessage);
                        }
                    });

                }

            }


        })
        client.on("messageReactionRemove", (reaction, user) => {
            if (user.bot == false && reaction.message.id == messageID) {
                let editedMessage;
                if (reaction.emoji.name === '👍') {
                    serverContact.contactServer("modifyStatus", { "pin": pin, "status": -1, "mcUsername": app.mcUsername }, function (response) {
                        console.log("got into the function!")
                        votes--;
                        if (Object.keys(response)[0] == "ErrorClass") {
                            const errorMessage = response[Object.keys(response)[0]].message;
                            const errorCode = response[Object.keys(response)[0]].errorCode;
                            applicationChannel.send(messagesJS.getErrorMessage(errorMessage, errorCode));
                        } else {

                            const currentStatus = response[Object.keys(response)[0]];
                            if (currentStatus >= 4 && votes >= 4) {
                                editedMessage = messagesJS.getPlayerMessage(app.mcUsername, app.discordUsername, app.questions, app.mcUsername, "Approved");

                            } else if (currentStatus <= 0 && votes >= 4) {
                                editedMessage = messagesJS.getPlayerMessage(app.mcUsername, app.discordUsername, app.questions, app.mcUsername, "Denied")

                            } else {
                                editedMessage = messagesJS.getPlayerMessage(app.mcUsername, app.discordUsername, app.questions, app.mcUsername, currentStatus)
                            }
                            returnMesage.edit(editedMessage);
                        }
                    });
                } else if (reaction.emoji.name === '👎') {
                    serverContact.contactServer("modifyStatus", { "pin": pin, "status": 1, "mcUsername": app.mcUsername }, function (response) {
                        votes--;
                        if (Object.keys(response)[0] == "ErrorClass") {
                            const errorMessage = response[Object.keys(response)[0]].message;
                            const errorCode = response[Object.keys(response)[0]].errorCode;
                            applicationChannel.send(messagesJS.getErrorMessage(errorMessage, errorCode));

                        } else {

                            const currentStatus = response[Object.keys(response)[0]];
                            if (currentStatus >= 4 && votes >= 4) {
                                editedMessage = messagesJS.getPlayerMessage(app.mcUsername, app.discordUsername, app.questions, app.mcUsername, "Approved")

                            } else if (currentStatus <= 0 && votes >= 4) {
                                editedMessage = messagesJS.getPlayerMessage(app.mcUsername, app.discordUsername, app.questions, app.mcUsername, "Denied");

                            } else {
                                editedMessage = messagesJS.getPlayerMessage(app.mcUsername, app.discordUsername, app.questions, app.mcUsername, currentStatus)
                            }
                            returnMesage.edit(editedMessage);
                        }
                    });

                }

            }


        })

    })

}


function sendApp(app) {
    let prevEnd = 0;
    if (app.questions.length > 1023) {
        const messageDividend = (app.questions.length) / 1023;
        for (let messageStr = 0; messageStr < messageDividend; ++messageStr) {
            for (let i = 1023 * (messageStr + 1); app.questions.charAt(i + 1) != " "; i--) {
                if (app.questions.charAt(i) == " ") {

                    const subStr = { "mcUsername": app.mcUsername, "discordUsername": app.discordUsername, "questions": app.questions.substring(prevEnd, i) };
                    // console.log("+++++" + app.questions.substring(1023 * messageStr, i).length);
                    if (messageStr > 0) {
                        applicationChannel.send(messagesJS.getOversizedApp(subStr.questions));
                    } else {
                        sendRatedApp(subStr);
                    }
                    prevEnd = i;
                }
            }
        }
    } else {
        const subStr = { "mcUsername": app.mcUsername, "discordUsername": app.discordUsername, "questions": app.questions };
        sendRatedApp(subStr);
    }
}

var express = require('express');
var app = express();
var fs = require("fs");

app.get('/displayApp', function (req, res) {
    const application = req.query.application;

    const response = JSON.parse(application);
    // console.log(response.Application);
    console.log("the username is: " + sendDM(response.Application.discordUsername));
    if (sendDM(response.Application.discordUsername) != undefined) {
        sendApp(response.Application);
        res.status(200).send({status: true});
    } else {
        res.status(200).send({status: false, message: "Couldnt find User in Server", code: 12});
        //res.status(500).json();
    }
    
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
})

client.login(token);

