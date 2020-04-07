module.exports = {

	yourID: "544164729354977282",

	setupCMD: "!createrolemessage",

	/**
	 * Delete the 'setupCMD' command after it is ran. Set to 'true' for the command message to be deleted
	 */
	deleteSetupCMD: false,

	initialMessage: `**React to the messages below to receive the associated role. If you would like to remove the role, simply remove your reaction!**`,
	
	embedMessage: `
	React to the emoji that matches the role you wish to receive.
	
	If you would like to remove the role, simply remove your reaction!
	`,
	
	/**
	 * Must set this if "embed" is set to true
	 */
	embedFooter: "Role Reactions",
	
	roles: ["20+", "18+", "15+", "12+"],

	/**
	 * For custom emojis, provide the name of the emoji
	 */
	reactions: ["💻", "🖌", "😃", "🆕"],

	/**
	 * Set to "true" if you want all roles to be in a single embed
	 */
	embed: true,

	/**
	 * Set the embed color if the "embed" variable is et to "true"
	 * Format:
	 * 
	 * #dd9323
	 */
	embedColor: "#dd9323",

	/**
	 * Set to "true" if you want to set a thumbnail in the embed
	 */
	embedThumbnail: false,

	/**
	 * The link for the embed thumbnail if "embedThumbnail" is set to true
	 */
	embedThumbnailLink: "",
};