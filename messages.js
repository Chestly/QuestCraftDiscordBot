module.exports = {
    getErrorMessage: function (error, code) {
        const message = {
            embed: {
                color: 15158332,
                title: "Oops, Something Went Wrong: Error Code " + code,
                description: error,

                timestamp: new Date(),
                footer: {
                    text: "© https://www.questcraft.net"
                }
            }
        }
        return message
    },
    getPlayerMessage: function (MCUser, discordName, application, requestedName, status) {
        const message = {
            embed: {
                color: 3066993,
                title: "Got Application on user: " + requestedName,
                description: "Successfully requested user Data on player: " + requestedName,
                fields: [{
                    name: "Application",
                    value: application
                },
                {
                    name: "Agreed to Rules",
                    value: "True"
                },
                {
                    name: "Minecraft Username",
                    value: MCUser
                },
                {
                    name: "Discord Username",
                    value: discordName
                },
                {
                    name: "Application Status",
                    value: status + "/4"
                }
                ],
                timestamp: new Date(),
                footer: {
                    text: "© https://www.questcraft.net"
                }
            }
        }
        return message
    },
    getVerification: function (user, link) {
        const message = {
            embed: {
                color: 3066993,
                title: "User " + user + " Discord Verification",
                description: "User "+ user + " has requested a Discord verification on your account, If this is you please click below",
                fields: [{
                    name: "Username",
                    value: user
                },
                {
                    name: "Verification",
                    value: "[Verify](" + link +")"
                }
                ],
                timestamp: new Date(),
                footer: {
                    text: "© https://www.questcraft.net"
                }
            }
        }
        return message
    },
    getApproved: function (MCUser, status, discordName) {
        const message = {
            embed: {
                color: 3066993,
                title: "Approved",
                description: "Approved Application of user: " + MCUser,
                fields: [
                {
                    name: "Minecraft Username",
                    value: MCUser
                },
                {
                    name: "Discord Username",
                    value: discordName
                },
                {
                    name: "Application Status",
                    value: status + "/4"
                }
                ],
                timestamp: new Date(),
                footer: {
                    text: "© https://www.questcraft.net"
                }
            }
        }
        return message
    },
    getDenied: function (MCUser, status, discordName) {
        const message = {
            embed: {
                color: 15158332,
                title: "Denied",
                description: "Denied Application of user: " + MCUser,
                fields: [
                {
                    name: "Minecraft Username",
                    value: MCUser
                },
                {
                    name: "Discord Username",
                    value: discordName
                },
                {
                    name: "Application Status",
                    value: status + "/4"
                }
                ],
                timestamp: new Date(),
                footer: {
                    text: "© https://www.questcraft.net"
                }
            }
        }
        return message
    },
    sendDM: function (MCUser, status, statusString) {
        const message = {
            embed: {
                color: 15844367,
                title: statusString,
                description: "Your applicaion has been " + statusString + ", contact Staff for more information",
                fields: [
                {
                    name: "Minecraft Username",
                    value: MCUser
                },
                {
                    name: "Application Status",
                    value: status + "/4"
                }
                ],
                timestamp: new Date(),
                footer: {
                    text: "© https://www.questcraft.net"
                }
            }
        }
        return message
    },
    applyMSG: function () {
        const message = {
            embed: {
                title: "Thanks for Joining!",
                color: 3066993,
                fields: [{
                    name: "Application",
                    value: "Please go to [QuestCraft.net](www.questcraft.net/apply.html) to apply for the server!"
                }
                ]
            }
        }
        return message;
    },
    getOversizedApp: function (application) {
        const message = {
            embed: {
                color: 3066993,
                fields: [{
                    name: "Application(continued...)",
                    value: application
                }
                ]
            }
        }
        return message;
    }
}


// fields: [{
//     name: "Fields",
//     value: "They can have different fields with small headlines."
//   },
//   {
//     name: "Masked links",
//     value: "You can put [masked links](http://google.com) inside of rich embeds."
//   },
//   {
//     name: "Markdown",
//     value: "You can put all the *usual* **__Markdown__** inside of them."
//   }
// ],