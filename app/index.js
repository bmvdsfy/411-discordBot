const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// コマンド
const helloCommand = require('./commands/utility/hello.js')

// クライアントインスタンスを作成
const client = new Client({ 
    intents: [GatewayIntentBits.Guilds]
});

// クライアントオブジェクトが準備OKとなったとき一度だけ実行されます
client.once(Events.ClientReady, readyCliend => {
	console.log(`準備OKです! ${readyCliend.user.tag}がログインします。`);
});

//スラッシュコマンドに応答するには、interactionCreateのイベントリスナーを使う必要があります
client.on(Events.InteractionCreate, async interaction => {

    // スラッシュ以外のコマンドの場合は対象外なので早期リターンさせて終了します
    // コマンドにスラッシュが使われているかどうかはisChatInputCommand()で判断しています
    if (!interaction.isChatInputCommand()) return;

    // helloコマンドに対する処理
    if (interaction.commandName === helloCommand.data.name) {
        try {
            await helloCommand.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'コマンド実行時にエラーになりました。', ephemeral: true });
            } else {
                await interaction.reply({ content: 'コマンド実行時にエラーになりました。', ephemeral: true });
            }
        }
    } else {
        console.error(`${interaction.commandName}というコマンドには対応していません。`);
    }
});


// ログインします
client.login(token);