/*
 * If you have some options where there is no answer,
 * these will be the first results by default
 */
const list = [
  {
    question: 'First',
    answer: [
      { text: '' },
      { code: '' },
    ],
    resources: [
      '',
    ],
  },
  {
    question: 'On my Mac, why is the terminal window showing a folder icon with a question mark?',
    answer: [
      { text: 'It indicates that it thinks you are working on a remote computer, and thus cannot navigate to the folder/files using Finder.' },
      { code: '' },
    ],
    resources: [
      'https://apple.stackexchange.com/questions/75751/why-does-the-folder-icon-in-my-terminal-have-a-question-mark-overlaid',
    ],
  },
  {
    question: 'How do you see what file symlinks to?',
    answer: [
      { text: '' },
      {
        code: `
        // last target of your symlink if there's more than one level
        readlink -f /path/file

        // next level of sym link
        readlink /path/file
      `,
      },
    ],
    resources: [
      '',
    ],
  },
  {
    question: 'What is an environment variable and how do you set one up?',
    answer: [
      { text: 'Note that the environmental variable will only persist for the remainder of the session(whenever the terminal window is closed, it is gone)' },
      {
        code: `
        export VAR='some value'

        // check value
        env | grep VAR
        echo $VAR
      `,
      },
    ],
    resources: [
      'https://unix.stackexchange.com/questions/368944/what-is-the-difference-between-env-setenv-export-and-when-to-use?rq=1',
    ],
  },
  {
    question: 'How do you see all the environmental variables?',
    answer: [
      { text: '' },
      { code: 'env' },
    ],
    resources: [
      '',
    ],
  },
  {
    question: 'If an environmental variable is set to another variable, is there any way to detect changes in the original variable and refresh the environmental variable?',
    answer: [
      { text: 'It seems like you would have to have it re-setup.' },
      {
        code: `
        // TESTING
        cd $HOME
        touch deleteONE deleteTWO
        ln -s deleteONE deleteSYMLINK
        export TEST=$( readlink $HOME/deleteSYMLINK )
        echo $TEST
        ln -sf deleteTWOdeleteSYMLINK
        echo $TEST

        // SOLUTION - SET IT AGAIN
        TEST=$( readlink $HOME/deleteSYMLINK )
        echo $TEST
      `,
      },
    ],
    resources: [
      '',
    ],
  },
  {
    question: 'What is a glob',
    answer: [
      { text: 'It is essentially regex' },
      {
        code: `
        **/*js - All the javascript files in this directory
      `,
      },
    ],
    resources: [
      'https://gist.github.com/reggi/475793ea1846affbcfe8',
    ],
  },
  {
    question: 'How do you echo with new lines?',
    answer: [
      { text: 'There are multiple ways you can do it' },
      {
        code: `
        echo -e "Hello\nworld"
        echo -e 'Hello\nworld'
        echo Hello$'\n'world
        echo Hello ; echo world
      `,
      },
    ],
    resources: [
      'https://stackoverflow.com/questions/8467424/echo-newline-in-bash-prints-literal-n',
    ],
  },
  {
    question: 'Why is my command not in bash_history or bash_sessions? Why is my history not preserved?',
    answer: [
      { text: "Each open terminal has its own history buffer. These buffers are appended to your $HISTFILE when the terminal is closed (maybe also whenever the buffer is filled, but I don't know how often that happens). If that is not the case, see how many commands the HISTFILE can store. " },
      { text: 'ORRRRRRR It may also be the case that by default, bash writes its history at the end of each session, overwriting the existing file with an updated version. This means that if you are logged in with multiple bash sessions, only the last one to exit will have its history saved.' },
      {
        code: `
        // Proper Way
        history | grep COMMAND

        // Testing
        echo $HISTFILE
        echo $HISTSIZE
        echo $HISTFILESIZE
      `,
      },
    ],
    resources: [
      'https://askubuntu.com/questions/885531/half-of-bash-history-is-missing',
      'https://superuser.com/questions/950403/bash-history-not-preserved-between-terminal-sessions-on-mac',
    ],
  },
  {
    question: 'What is the difference between bash_history and bash_sessions',
    answer: [
      { text: 'Bash_history has been around for all versions of macOS while bash_sessions has been a newer feature starting with El Capitan. With bash_history, you cannot tell when any command in that file was run, the sequence of commands may not be right, and so on. Even if you only have one terminal running, you wont be able to know when a command is run. With the advent of El Capitan, each terminal session is associated with a randomly generated session id.' },
      {
        code: `
        echo $TERMINAL_SESSION_ID
      `,
      },
    ],
    resources: [
      'https://www.swiftforensics.com/2018/05/bash-sessions-in-macos.html',
    ],
  },
  {
    question: 'What is shopt -s histappend',
    answer: [
      { text: 'By default, bash writes its history at the end of each session, overwriting the existing file with an updated version. This means that if you are logged in with multiple bash sessions, only the last one to exit will have its history saved. We can work around this by setting the histappend setting, which will append instead of overwrite the history. This may be set already, but if it is not, you can enable this by adding this line' },
      { code: '' },
    ],
    resources: [
      'https://www.digitalocean.com/community/tutorials/how-to-use-bash-history-commands-and-expansions-on-a-linux-vps',
    ],
  },
  {
    question: 'How do I see the entire bash history',
    answer: [
      { text: '' },
      {
        code: `
        history | grep phrase
        history | tail -10
      `,
      },
    ],
  },
  {
    question: 'What is shopt',
    answer: [
      { text: "shopt is not a command, but a shell built-in. bash knows what to do with it because it's a bash built-in. So you cannot do which shopt. It is used to set and unset bash options" },
      {
        code: `
        // Set an Option
        shopt -s optionNameHere

        // Unset an Option
        shopt -u optionNameHere

        // Example Options
        histappend
        globstar
      `,
      },
    ],
    resources: [
      'https://stackoverflow.com/questions/26616003/shopt-command-not-found-in-bashrc-after-shell-updation',
      'https://bash.cyberciti.biz/guide/Shopt',
    ],
  },
  {
    question: 'Instead of waiting until the shell closes, can we update the bash_history after every command',
    answer: [
      { text: 'Yes. If we want to have bash immediately add commands to our history instead of waiting for the end of each session (to enable commands in one terminal to be instantly be available in another), we can also set or append the history -a command to the PROMPT_COMMAND parameter, which contains commands that are executed before each new command prompt.' },
      { text: 'To do this correctly, we need to do a bit of a hack. We need to append to the history file immediately with history -a, clear the current history in our session with history -c, and then read the history file that we’ve appended to, back into our session history with history -r.' },
      {
        code: `
        # Maximum number of history lines in memory
        export histsize=50000
        # maximum number of history lines on disk
        export histfilesize=50000
        # ignore duplicate lines
        export histcontrol=ignoredups:erasedups
        # when the shell exits, append to the history file
        #  instead of overwriting it
        shopt -s histappend

        # after each command, append to the history file
        #  and reread it
        export PROMPT_COMMAND="\${PROMPT_COMMAND:+$PROMPT_COMMAND$'n'}history -a; history -c; history -r

        OR
        export PROMPT_COMMAND="history -a; history -c; history -r; $PROMPT_COMMAND"
      `,
      },
    ],
    resources: [
      'https://www.digitalocean.com/community/tutorials/how-to-use-bash-history-commands-and-expansions-on-a-linux-vps',
      'https://lpetr.org/2016/05/04/preserve-bash-history/',
    ],
  },
  {
    question: 'What are the history options - -a -c -r',
    answer: [
      { text: '' },
      {
        code: `
        history -a - append to the current history file
        history -c - clear contents in bash_history file
        history -r - read the history file back into our session history
      `,
      },
    ],
    resources: [
      'https://www.digitalocean.com/community/tutorials/how-to-use-bash-history-commands-and-expansions-on-a-linux-vps',
    ],
  },
  {
    question: 'How do you ignore dups in the bash_history',
    answer: [
      { text: '' },
      {
        code: `
        HISTCONTROL=ignorespace
        HISTCONTROL=ignoredups

        HISTCONTROL=both
      `,
      },
    ],
    resources: [
      'https://www.howtogeek.com/howto/44997/how-to-use-bash-history-to-improve-your-command-line-productivity/',
    ],
  },
  {
    question: 'How do I see history with timestamp',
    answer: [
      { text: '' },
      { code: 'export HISTTIMEFORMAT=\'%F, %T \'' },
    ],
    resources: [
      'https://vitux.com/linux-bash-history/',
    ],
  },
  {
    question: 'How to rerun previous command and modify it',
    answer: [
      { text: '' },
      {
        code: `
          ping gogle.com
          ^gog^goog
      `,
      },
    ],
    resources: [
      'https://www.howtogeek.com/howto/44997/how-to-use-bash-history-to-improve-your-command-line-productivity/',
    ],
  },
  {
    question: 'Can I disable bash sessions?',
    answer: [
      { text: 'Add the following line to your bashrc' },
      {
        code: `
        SHELL_SESSION_HISTORY=0
      `,
      },
    ],
    resources: [
      'https://stackoverflow.com/questions/32418438/how-can-i-disable-bash-sessions-in-os-x-el-capitan',
    ],
  },
  {
    question: 'How do I see the first of last n lines of a file',
    answer: [
      { text: '' },
      {
        code: `
        head -n 10 FILE
        head 10 FILE

        tail -n 10 FILE
        tail 10 FILE

        cat FILE | head 10
      `,
      },
    ],
    resources: [
      '',
    ],
  },
  {
    question: 'How do I follow a file that keeps changing like a log file',
    answer: [
      { text: '' },
      { code: 'tail -f fileName' },
    ],
  },
  {
    question: 'How do you go back to a certain section of file using less?',
    answer: [
      { text: 'As you are going through the file, you can add marks to place a breadcrumb that you can come back to' },
      {
        code: `
        Set Mark - m followed by a letter
        Go to Mark - ' or " followed by the same letter
      `,
      },
    ],
    resources: [
      'https://www.howtogeek.com/444233/how-to-use-the-less-command-on-linux/',
    ],
  },
  {
    question: 'What is less -r and why do I need it?',
    answer: [
      { text: 'It is short for show raw control chars. When you have bash output with colors, less doesn’t handle the color codes properly by default' },
      { code: 'less -r file' },
    ],
    resources: [
      'https://unix.stackexchange.com/questions/280419/how-to-use-less-in-a-script-without-getting-esc-escape-characters',
      'https://major.io/2013/05/21/handling-terminal-color-escape-sequences-in-less/',
    ],
  },
  {
    question: 'Can I open mulitple files with less?',
    answer: [
      { text: 'Yes you can switch between the two files with n(next) and p(previous)' },
      { code: 'less file1 file2' },
    ],
    resources: [
      'https://www.howtogeek.com/444233/how-to-use-the-less-command-on-linux/',
    ],
  },
  {
    question: 'How do you open a file with line numbers using less',
    answer: [
      { text: '' },
      { code: 'less -N file' },
    ],
    resources: [
      'https://www.howtogeek.com/444233/how-to-use-the-less-command-on-linux/',
    ],
  },
  {
    question: 'How do you write an if statement with multiple conditions?',
    answer: [
      { text: '' },
      {
        code: `
        [ ! -L ~/.bashrc ] && [ -f ~/.bashrc ] && echo hi
      `,
      },
    ],
    resources: [
      'https://linuxize.com/post/bash-check-if-file-exists/',
      'https://unix.stackexchange.com/questions/426568/how-to-write-an-if-statement-with-multiple-conditions',
    ],
  },
  {
    question: 'How do you test if a file exists',
    answer: [
      { text: '' },
      {
        code: `
        test -f fileName && echo file exists
        [ -f spanish* ] && echo hi
      `,
      },
    ],
    resources: [
      'https://stackoverflow.com/questions/5767062/how-to-check-if-a-symlink-exists',
      'https://linuxize.com/post/bash-check-if-file-exists/',
    ],
  },
  {
    question: 'How do you test if a symlink exists',
    answer: [
      { text: '' },
      {
        code: `
        test -L symlinkName && echo symlink exists
        [ -L spanish* ] && echo hi
      `,
      },
    ],
    resources: [
      'https://stackoverflow.com/questions/5767062/how-to-check-if-a-symlink-exists',
      'https://linuxize.com/post/bash-check-if-file-exists/',
    ],
  },
  {
    question: 'Why and how do you force a symlink?',
    answer: [
      { text: 'You normally cannot create a symlink with the same name as an existing symlink. You would have to rm the symlink and then create a new one or you can force it' },
      {
        code: `
        Assuming you have a symlink called "SYMLINK"

        1. Remove the symlink and create a new one
        rm SYMLINK
        ln -s ~/index.js SYMLINK

        2. Force a symlink with the -f option
        ln -sf ~/index.js SYMLINK
      `,
      },
    ],
    resources: [
      'https://serverfault.com/questions/389997/how-to-override-update-a-symlink',
    ],
  },
  {
    question: 'What is PROMPT_COMMAND',
    answer: [
      { text: 'PROMPT_COMMAND allows you to provide a command before the printing of the prompt. It is useful if you want to show the git branch you are on persay' },
      { code: '' },
    ],
    resources: [
      'https://stackoverflow.com/questions/3058325/what-is-the-difference-between-ps1-and-prompt-command',
    ],
  },
  {
    question: 'How do you see if you can run a command?',
    answer: [
      { text: '' },
      { code: 'type <COMMAND> OR which <COMMAND>' },
    ],
  },
  {
    question: 'Can you source a symlink? This is when I try to have my bashrc link to another file',
    answer: [
      { text: 'Yes. If you are having trouble, it is most likely because the symlink is not set up properly. You might need to redo the symlink with a full path' },
      { code: '' },
    ],
    resources: [
      'https://stackoverflow.com/questions/39572652/does-source-automatically-follow-symbolic-links-bash',
    ],
  },
  //
  // MAKEFILE
  //
  {
    question: 'Why do I get this error `Missing separator in Makefile`',
    answer: [
      { text: 'When you are using vim, make sure that expandtab is off. Currently vim is expanding the tabs - converting the tabs into spaces. Makefiles are notorious for the spaces. Update your editor in this case vim to have the following' },
      {
        code: `
        :set noexpandtab

        ---------------
        # Normal action
        set expandtab

        if has('autocmd')
            # If the filetype is Makefile then we need to use tabs
            # So do not expand tabs into space.
            autocmd FileType make   set noexpandtab
        endif
      `,
      },
    ],
    resources: [
      'https://vi.stackexchange.com/questions/704/insert-tabs-in-insert-mode-when-expandtab-is-set',
    ],
  },
  {
    question: 'Why do I get this error writing an if statement in a makefile - syntax error: unexpected end of file',
    answer: [
      { text: 'You most likely have a mismatched structure' },
      {
        code: `
        clean:
        ifeq (4,4)
        # Works fine

        clean:
            ifeq (4,4)
        # syntax error near unexpected token
      `,
      },
    ],
    resources: [
      'https://stackoverflow.com/questions/9886268/shell-script-syntax-error-unexpected-end-of-file',
    ],
  },
  {
    question: 'How do I check to see if a file exists?',
    answer: [
      { text: 'If you are using Makefile syntax, make sure everything is aligned to the left. ' },
      {
        code: `
        FILE_PATH = ~/.bashrc
        FILE_NAME = bashrc

        # Shell Scripting Syntax
        checkIfFileExists:
        # test and [ are effectively the same
            @[ -e ~/.bashrc ] && echo exists || echo not exists
            @[ -f ~/.bashrc ] && echo exists || echo not exists
            @if test -f ~/.bashrc; then echo exists; else echo does not; fi
            @if test -e ~/.bashrc; then echo exists; else echo does not; fi
            @if [ -f ~/.bashrc ]; \
            then \
                mv ~/.bashrc ~/.bashrc_bak; \
            fi

        # Makefile Native Syntax
        checkIfFileExists:
        ifeq ("$(shell test -e \${FILE_PATH} && echo ex)","ex")
            @echo Bashrc exists
        else
            @echo Bashrc does not exists
        endif

        ifneq ("$(wildcard $(FILE_NAME))","")
            @echo Bashrc exists
        else
            @echo Bashrc does not exists
        endif
      `,
      },
    ],
    resources: [
      'https://stackoverflow.com/questions/6348643/makefile-rules-and-if-statements-how',
      'tions/5553352/how-do-i-check-if-file-exists-in-makefile-so-i-can-delete-it',
      'http://www.humbug.in/2012/makefile-check-if-a-file-exists-using-wildcard-function/',
    ],
  },
  {
    question: 'How do you create an if statement?',
    answer: [
      { text: 'If you are using Makefile syntax, make sure everything is aligned to the left. If you are using Shell syntax and need to span multiple lines make sure you have \\ and ; in the right place' },
      {
        code: `
        # Shell Scripting Syntax
        checkIfEqual:
            @if [ "test" = "test" ]; then\
                echo "Hello world";\
            fi

        # Makefile Syntax
        checkIfEqual:
        ifneq (4, 4)
            @echo hi
        else
            @echo bye
        endif
      `,
      },
    ],
    resources: [
      '',
    ],
  },
  {
    question: 'Why do I see the >---?',
    answer: [
      { text: '>--- is used to indicate that there is a tab. This is what happens when you have expandontab set to false. When set to false, tabs are not converted to spaces. This is what you want in a Makefile because spaces pose a huge problem?' },
      { code: '' },
    ],
    resources: [
      '',
    ],
  },
  {
    question: 'Why is there a @ in front of the echo or if',
    answer: [
      { text: 'If you dont put the @ in front, you will see unwanted text. You will see the entire line with the if or the echo, so essentially repeated text' },
      {
        code: `
        echo hi
        -> echo hi
        -> hi

        @echo hi
        -> hi
      `,
      },
    ],
    resources: [
      '',
    ],
  },
  {
    question: 'Can you have breaks in the make target?',
    answer: [
      { text: "Yes it will still work. As long as you don't mess us your indentation, you should be fine." },
      {
        code: `
        bash:
            @echo "We will skip a line"

            @echo "We skipped a line"
      `,
      },
    ],
    resources: [
      '',
    ],
  },
  {
    question: 'How do you see how long something takes?',
    answer: [
      { text: '' },
      {
        code: `
        time PROCESS
        time ack TERM
      `,
      },
    ],
    resources: [
      '',
    ],
  },
  {
    question: 'How do you prevent the laptop from sleeping?',
    answer: [
      { text: '' },
      {
        code: `
        caffeinate
      `,
      },
    ],
    resources: [
      '',
    ],
  },
  {
    question: 'Why do I see files ending in d and then some ending in .d',
    answer: [
      { text: 'd means it a daemon and .d means it a directory' },
      { code: '' },
    ],
    resources: [
      'https://unix.stackexchange.com/questions/4029/what-does-the-d-stand-for-in-directory-names',
      'https://unix.stackexchange.com/questions/72587/why-do-some-linux-files-have-a-d-suffix',
    ],
  },
  {
    question: 'Where is my bashrc',
    answer: [
      { text: 'First, it depends what distro you have because depending on the distro, the location of your system wide bashrc might be different. So, you have system wide bashrc and then user specific bashrc. It usually goes in this order' },
      {
        code: `
        /etc/profile
        /etc/bashrc (/etc/bash.bashrc)
        ~/.bash_profile, ~/.bash_login, and ~/.profile
        ~/.bashrc
      `,
      },
    ],
    resources: [
      'https://unix.stackexchange.com/questions/211713/where-is-bashrc-file-found-in-linux',
    ],
  },
  {
    question: 'What tools can I use to install packages?',
    answer: [
      { text: "If you are on a Mac, you will most likely use brew. On Ubuntu? apt, apt-get or dkpg. Don't forget there is curl and wget" },
      { code: '' },
    ],
    resources: [
      'https://unix.stackexchange.com/questions/359219/error-when-using-apt-on-macos-sierra',
    ],
  },
  {
    question: 'What is apt and apt-get?',
    answer: [
      { text: 'Apt is a wrapper around apt-get with some improvements. According to some, apt-get is a bit more on the lower level' },
      { code: '' },
    ],
    resources: [
      'https://itsfoss.com/apt-vs-apt-get-difference/',
    ],
  },
  {
    question: 'How do I install or upgrade packages using apt or apt get?',
    answer: [
      { text: 'First you have to refresh your package database on Ubuntu for apt. Updating the package database requires superuser privileges, so you’ll need to use sudo' },
      {
        code: `
        sudo apt update
        sudo apt install bash-completion

        sudo apt-get update
        sudo apt-get upgrade PACKAGE
        sudo apt-get install PACKAGE
      `,
      },
    ],
    resources: [
      'https://itsfoss.com/apt-get-linux-guide/',
    ],
  },
  {
    question: 'How can I check to see what packages I  have installed through apt if I am using ubeuntu',
    answer: [
      { text: 'sudo apt list --installed' },
      { code: '' },
    ],
    resources: [
      'https://www.rosehosting.com/blog/list-all-installed-packages-with-apt-on-ubuntu/',
    ],
  },
  {
    question: 'How do I remove using apt or apt get?',
    answer: [
      { text: 'You can use purge to remove the package files and configurations from the system' },
      {
        code: `
          sudo apt remove PACKAGE
          sudo apt purge PACKAGE
          // removes the config files as well

          apt-get –-purge remove skypeforlinux
          // purge removes the config files as well
      `,
      },
    ],
    resources: [
      'https://linuxhint.com/uninstall-debian-packages/',
      'https://hostadvice.com/how-to/how-to-use-the-apt-command-to-manage-ubuntu-packages/',
    ],
  },
  {
    question: 'What is dkpg? How do I use the dkpg command to install packages',
    answer: [
      { text: 'Dkpg is another alternative used to install packages for ubuntu.' },
      {
        code: `
        dpkg --install PACKAGE
        sudo dpkg -i PACKAGE
      `,
      },
    ],
    resources: [
      'https://linuxize.com/post/how-to-install-deb-packages-on-ubuntu/',
    ],
  },
  {
    question: 'How do I list packages installed with dkpg',
    answer: [
      { text: '' },
      {
        code: `
        dpkg --list
        sudo dpkg -l
      `,
      },
    ],
    resources: [
      'https://linuxhint.com/uninstall-debian-packages/',
    ],
  },
  {
    question: 'How do I remove packages with dkpg',
    answer: [
      { text: '' },
      {
        code: `
        dpkg --remove PACKAGE
        dpkg -r PACKAGE
      `,
      },
    ],
    resources: [
      'https://linuxhint.com/uninstall-debian-packages/',
    ],
  },
  {
    question: 'How do run dry-run of Makefile target',
    answer: [
      { text: 'Use the -n flag. This shows you what commands would be run.' },
      {
        code: `
        make -n start
      `,
      },
    ],
    resources: [
      '',
    ],
  },
  {
    question: 'When would I use locate instead of find',
    answer: [
      { text: 'Both are used to find file, but locate is faster in terms of speed. That being said, with find you have more options, like finding by size, date, owner, etc.' },
      { code: '' },
    ],
    resources: [
      'https://unix.stackexchange.com/questions/60205/locate-vs-find-usage-pros-and-cons-of-each-other',
    ],
  },
  {
    question: 'How do I check if we are on Mac or Linux',
    answer: [
      { text: 'You can use uname' },
      {
        code: `
        uname -a
        uname -s

        #!/usr/bin/env bash

        if [ "$(uname)" == "Darwin" ]; then
            # Do something under Mac OS X platform
        elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
            # Do something under GNU/Linux platform
        elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ]; then
            # Do something under 32 bits Windows NT platform
        elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW64_NT" ]; then
            # Do something under 64 bits Windows NT platform
        fi
      `,
      },
    ],
    resources: [
      'https://stackoverflow.com/questions/3466166/how-to-check-if-running-in-cygwin-mac-or-linux',
    ],
  },
  {
    question: 'How do you use the cal command?',
    answer: [
      { text: 'Month can be a number or the letters' },
      {
        code: `
        // current month
        cal

        // current month and x number of months after
        cal -A x
        cal -A x YEAR
        cal -A x MONTH YEAR

        // current month and x number of months before
        cal -B x

        // current month and surrounding months
        cal -3

        // specific year
        cal -y YEAR OR cal YEAR

        // show month this year
        cal -m (Jan, JAN, January, 2)

        // show specific month and year
        cal MONTH YEAR
        cal 5 2019
      `,
      },
    ],
    resources: [
      'https://www.computerhope.com/unix/ucal.htm',
    ],
  },
  {
    question: 'How can I find text within files?',
    answer: [
      { text: 'You can use grep or ack. Grep is already built in and ack you would have to install. There are other tools are rgrep etc.' },
      { code: '' },
    ],
    resources: [
      '',
    ],
  },
  {
    question: 'How do you use grep',
    answer: [
      { text: '' },
      {
        code: `
        // recursive
        grep -r TERM PATH

        // case insensitive
        grep -i TERM PATH

        // excluding term
        grep -v TERM PATH

        // count number of occurence for term
        grep -c TERM PATH

        // return name of files that include the term
        grep -l TERM PATH

        // return name of files that exclude the term
        grep -L TERM PATH
      `,
      },
    ],
    resources: [
      'https://bencane.com/2013/08/19/grepping-a-file-without-using-cat-and-grep-other-tricks/',
    ],
  },
  {
    question: 'How do you rename all the files in a directory given the date created or modified',
    answer: [
      { text: '' },
      {
        code: `
        for f in *.jpg; do
          echo mv "$f" "$(stat -f '%Sm' -t '%Y-%m-%d %H.%M.%S' "$f")".jpg
        done

        // Remove echo once you are sure its good
      `,
      },
    ],
    resources: [
      'https://apple.stackexchange.com/questions/288511/how-to-batch-rename-files-via-terminal-using-the-files-date-as-filename',
    ],
  },
  {
    question: 'How do you batch rename files? Batch update content of multiple files',
    answer: [
      { text: 'You will need to rely on bash string manipulation' },
      {
        code: `
        for file in *;
          echo $file;

          # TemplateToCopy.js -> TemplateToReplicate.js
          do mv -v -- $file \${file / Copy / Replicate}; #substitute Copy with Replicate

          # TemplateToCopy.txt -> TemplateToCopy.js
          do mv -v -- $file \${file%.txt}.js; #remove .txt from back or string

          # TemplateToCopy.js -> NewComponent.js
          do mv -v -- $file NewComponent\${file#TemplateToCopy}; #remove TemplateToCopy from the front of string
        done;

        sed -i "" s/old/new/g *
      `,
      },
    ],
    resources: [
      'http://mywiki.wooledge.org/BashFAQ/100#Removing_part_of_a_string',
      'https://unix.stackexchange.com/questions/194936/how-to-drop-delete-characters-from-in-front-of-a-string',
      'https://www.cyberciti.biz/tips/renaming-multiple-files-at-a-shell-prompt.html',
      'https://stackoverflow.com/questions/5394112/how-can-i-batch-rename-files-using-the-terminal',
    ],
  },
  {
    question: 'How do you get files created after a date with ls?',
    answer: [
      { text: '' },
      {
        code: `
        // Modified since yesterday (24 hours ago)
        find . -maxdepth 1 -mtime -1

        // Modified more than 24 hrs ago
        find . -maxdepth 1 -mtime +1

        find . -type f -newermt '1/30/2017 0:00:00'1
      `,
      },
    ],
    resources: [
      '',
    ],
  },
  {
    question: 'How do I create a new blank file',
    answer: [
      { text: '' },
      {
        code: `
        touch FILE

        // If FILE already exits, touching it will change the timestamp. The modified timestamp will get updated.
      `,
      },
    ],
    resources: [
      '',
    ],
  },
  {
    question: 'How do you change the creation date or last modified date for a file',
    answer: [
      { text: '' },
      {
        code: `
        // change access time to time now
        touch -a FILE

        // change modified time to time now
        touch -m FILE
        // When changing the modify time, the change time will be also updated

        // Specify date - NOT VALID ON MAC
        touch -d '1 June 2018 11:02' FILE
        touch --date '1 June 2018 11:02' FILE

        // Specify date - June 1 11:02
        touch -t 06011102 FILE
        // Date needs to be in this format - [[CC]YY]MMDDhhmm[.ss]
      `,
      },
    ],
    resources: [
      'https://linuxize.com/post/linux-touch-command/',
      'https://apple.stackexchange.com/questions/99536/changing-creation-date-of-a-file',
      'https://hackernoon.com/how-to-change-a-file-s-last-modified-and-creation-dates-on-mac-os-x-494f8f76cdf4',
    ],
  },
  {
    question: 'How do I check the access, modified and change time of a file',
    answer: [
      { text: '' },
      {
        code: `
        GetFileInfo -d FILE

        stat FILE

        // Creation date and filename - THIS DOES NOT WORK ON MAC
        stat -c '%Y : %n' FILE

        // This works on mac
        stat -f %m bash.js - not in string format
        stat -f %Sa bash.js
        stat -f %Sm bash.js - string format
        stat -f %Sc bash.js
        stat -f %SB bash.js

        // This makes it terse
        stat -x FILE
      `,
      },
    ],
    resources: [
      'https://unix.stackexchange.com/questions/2464/timestamp-modification-time-and-created-time-of-a-file',
      'https://askubuntu.com/questions/803149/how-to-display-modified-time-of-a-file',
      'https://unix.stackexchange.com/questions/175325/output-of-stat-on-osx',
      'https://stackoverflow.com/questions/29826010/how-to-use-the-stat-command-on-os-x-to-display-a-file-or-directories-creation-da',
    ],
  },
  {
    question: 'Why is stat not working as intended based on what I see online',
    answer: [
      { text: 'stat on macOS is a bit different that that of linux. What you are seeing online is probably related to stat on linux machines.' },
      { code: '' },
    ],
    resources: [
      'https://unix.stackexchange.com/questions/175325/output-of-stat-on-osx',
    ],
  },
  {
    question: 'How come my Mac is showing me the same time for the access, modified and creation date?',
    answer: [
      { text: 'Using vim to test is misleading. Vim will write your modified file to a new temporary file, then rename the old one and the new one, so the creation time will be updated to when the file was written. Use GetInfo instead' },
      {
        code: `
        stat -f %Sa bash.js
        stat -f %Sm bash.js
        stat -f %Sc bash.js

        GetFileInfo -d .bash_profile
      `,
      },
    ],
    resources: [
      'https://stackoverflow.com/questions/34123076/osx-how-to-get-the-creation-modification-time-of-a-file-from-the-command-lin',
    ],
  },
  {
    question: 'What kind of file am I dealing with?',
    answer: [
      { text: '' },
      {
        code: `
        file FILE
      `,
      },
    ],
    resources: [
      'https://www.macissues.com/2016/01/19/how-to-get-file-information-from-the-command-line-in-os-x/',
    ],
  },
  {
    question: 'How do we get even more info on the metadata?',
    answer: [
      { text: 'Mdls, which I think is short for metadata list' },
      {
        code: `
        mdls FILE
      `,
      },
    ],
    resources: [
      'https://apple.stackexchange.com/questions/222342/terminal-command-to-get-all-of-a-files-metadata',
    ],
  },
  {
    question: 'Are there any cool existing bash scripts?',
    answer: [
      { text: 'Bash-snippets. What is nice is that you can install with brew' },
      {
        code: `
        brew install bash-snippets

        OR

        git clone https://github.com/alexanderepstein/Bash-Snippets
        cd Bash-Snippets/
        sudo ./install.sh
        sudo ./install.sh all
      `,
      },
    ],
    resources: [
      'https://www.ostechnix.com/collection-useful-bash-scripts-heavy-commandline-users/',
    ],
  },
  {
    question: 'How do you have an if statement with a command instead',
    answer: [
      { text: 'You use $( ). Make sure you have the proper spaces' },
      {
        code: `
        test $( which brew ) && echo hi
        [ $( which brew ) ] && echo hi
      `,
      },
    ],
    resources: [
      'https://bencane.com/2014/01/27/8-examples-of-bash-if-statements-to-get-you-started/',
    ],
  },
  {
    question: 'What is the difference between a [ ] and a [[ ]]',
    answer: [
      { text: '[ ] and [[ ]] are both variants of test. [[ ]] is a bit newer and has more capabililies. Use [ ] if you need your code to be portable' },
      { code: '' },
    ],
    resources: [
      'https://linuxize.com/post/bash-if-else-statement/',
    ],
  },
  {
    question: 'How do you set a variable equal to the return value of a command? How do you echo the return value of a command',
    answer: [
      { text: 'Make sure you have the proper spacing with the parentheses' },
      {
        code: `
        VAR=$( COMMAND )
        today=$( date )

        echo $( COMMAND )
      `,
      },
    ],
    resources: [
      '',
    ],
  },
  {
    question: 'What does unary operator expected mean?',
    answer: [
      { text: 'It occurs usually when you have an if statement and one side becomes empty' },
      {
        code: `
        if [ $name = "foo" ]
        if [ = "foo" ] #if $name is empty

        # Solution
        if [ "$name" = "foo" ]
      `,
      },
    ],
    resources: [
      'http://linuxcommand.org/lc3_wss0090.php',
      'http://www.linuxintro.org/wiki/What_does_%22unary_operator_expected%22_mean',
    ],
  },
  {
    question: 'What is a good resource for bash if statements?',
    answer: [
      { text: '' },
      { code: '' },
    ],
    resources: [
      'https://ss64.com/bash/test.html',
    ],
  },
  {
    question: 'What is #!/bin/bash',
    answer: [
      { text: 'This is known as shebang, and it tells the interpreter that the following lines are written for bash , so execute this file as bash script.' },
      { code: '' },
    ],
    resources: [
      'https://www.quora.com/What-is-bin-bash-in-shell-scripting-What-is-the-difference-between-bin-sh-and-bin-bash-Why-do-some-times-the-shell-script-works-without-the-lines',
    ],
  },
  {
    question: 'Can you edit a file without opening it in an editor?',
    answer: [
      { text: 'Yes you can use the sed command.' },
      {
        code: `
        // Replace all occurences of a word
            sed "s/before/after/" FILE
            sed s/before/after/ FILE

        // If you have spaces, you have to use '\\ '
            sed -i "" s/\\ \\ \\ \\ ]$/\\ \\ \\ \\ ],/ tmux.js
      `,
      },
    ],
    resources: [
      'https://www.fastwebhost.in/blog/how-to-use-sed-command-in-unix-with-examples/',
      'https://www.digitalocean.com/community/tutorials/the-basics-of-using-the-sed-stream-editor-to-manipulate-text-in-linux',
    ],
  },
  {
    question: 'How do I replace newlines with sed',
    answer: [
      { text: 'Unfortunately sed works on a line by line basis, so it does not really detect \n' },
      { code: '' },
    ],
    resources: [
      'https://stackoverflow.com/questions/1251999/how-can-i-replace-a-newline-n-using-sed/1252010#1252010',
    ],
  },
  {
    question: 'Why sed is not modifying file?',
    answer: [
      { text: 'Sed operates on streams and prints its output to standard out. If you want sed to edit an existing file in place, you should give -i option to it. It is short for in-place' },
      {
        code: `
        sed -i s/before/after/ FILE
      `,
      },
    ],
    resources: [
      'https://stackoverflow.com/questions/14553804/sed-not-replacing-lines',
    ],
  },
  {
    question: 'Why do I get this error when I try to use sed on Mac - extra characters at the end of h command',
    answer: [
      { text: "Ubuntu ships with GNU sed, where the suffix for the -i option is optional. OS X ships with BSD sed, where the suffix is mandatory. Try sed -i ''" },
      {
        code: `
        sed -i "" s/before/after/ FILE
      `,
      },
    ],
    resources: [
      '',
    ],
  },
  {
    question: 'Using sed, can I take search for a block of text(ie 2 lines) and convert to one line? How about 1 line going into 2?',
    answer: [
      { text: '2 to 1 - No because sed does line by line. 1 to 2 - maybe no.' },
      {
        code: `
        // You cannot use the \n on Macs since we use BSD implemenation of sed instead of GNU
        sed 's/foo/foo\nbar'

        // Use a literal newline - MUST USE SINGLE QUOTES AND YOU MUST ESCAPE THE NEWLINE(TYPE \\ BEFORE YOU PRESS ENTER)
        sed 's/foo/foo\
        bar/'
      `,
      },
    ],
    resources: [
      'https://stackoverflow.com/questions/46082397/insert-newline-n-using-sed',
    ],
  },
  {
    question: 'What is the difference between single and double quotes when using bash?',
    answer: [
      { text: 'Single quotes wont interpolate anything(thus preserving the literal value), but double quotes will' },
      {
        code: `
        echo "$(echo "upg")" => upg
        echo '$(echo "upg")' => $(echo "upg")
      `,
      },
    ],
    resources: [
      'https://stackoverflow.com/questions/6697753/difference-between-single-and-double-quotes-in-bash',
    ],
  },
  {
    question: 'How do you use capture groups when using sed?',
    answer: [
      { text: 'It is very similar to how you do it in vim' },
      {
        code: `
        answer: "HI",
        TO
        answer: [
          { text: "HI" }

        sed  's/answer:\\ "\\(.*\\)",/answer:\\ [\
          { text: "\\1" },/' FILE
      `,
      },
    ],
    resources: [
      'https://unix.stackexchange.com/questions/263668/sed-capture-groups-not-working',
    ],
  },
  {
    question: 'How do you print out specific lines in a file with sed?',
    answer: [
      { text: 'Make sure you use the -n option to avoid repetition of line printing' },
      {
        code: `
        sed -n "2,10p" FILE
      `,
      },
    ],
    resources: [
      'https://www.tutorialspoint.com/unix/unix-regular-expressions.htm',
    ],
  },
  {
    question: 'What is a daemon?',
    answer: [
      { text: 'A daemon is a process that runs in the background such as copy and paste. Its always in the backgorund listening and waiting to act.' },
      { code: '' },
    ],
    resources: [
      'https://www.quora.com/What-is-daemon',
    ],
  },
  {
    question: 'How do you check if your current path is part of a given path?',
    answer: [
      { text: '' },
      {
        code: `
        // Replace /home with whatever path you want - must be absolute path
        // It strips the path from the left side. If you are not within that specified path, nothing gets striped off the path, so it would equal PWD
        test "\${PWD##/home/}" != "\${PWD}"
      `,
      },
    ],
    resources: [
      'https://unix.stackexchange.com/questions/6435/how-to-check-if-pwd-is-a-subdirectory-of-a-given-path',
    ],
  },
  {
    question: 'Why does make think the target is up to date?',
    answer: [
      { text: 'You have a file with the same name as the Makefile target..' },
      { code: '' },
    ],
    resources: [
      'https://stackoverflow.com/questions/3931741/why-does-make-think-the-target-is-up-to-date',
    ],
  },
  {
    question: 'What combos are there with the Ctrl key in bash?',
    answer: [
      { text: '' },
      { code: '' },
    ],
    resources: [
      'https://superuser.com/questions/120333/what-are-the-common-control-combinations-in-a-terminal-setting',
    ],
  },
  {
    question: 'How do you sort?',
    answer: [
      { text: 'You can sort the contents within a file or output from command.' },
      {
        code: `
        // Sort content in files
        sort FILENAME

        // Sort by numbers
        ls | sort -n
        `,
      },
    ],
    resources: [
      'https://www.geeksforgeeks.org/sort-command-linuxunix-examples/',
    ],
  },
  {
    question: 'How do I execute shell commands from node file?',
    answer: [
      { text: 'You can use exec or execSync. If you want to save the value to a variable use execSync. Also you might have to use toString to convert what you have into a stirng' },
      {
        code: `
        const { exec } = require("child_process");
        exec("ls -la", (error, stdout, stderr) => {});

        OR

        var {execSync} = require("child_process");
        var returnValue = execSync('ls -la').toString()
        `,
      },
    ],
    resources: [
      'https://stackabuse.com/executing-shell-commands-with-node-js/',
      'https://tips.tutorialhorizon.com/2018/11/14/returning-a-value-from-a-node-child-process/',
    ],
  },
  {
    question: 'After updating to Catalina, why do I get this issue when I try to do any git command?',
    answer: [
      { text: '' },
      {
        code: `
        xcode-select --install

        xcode-select --reset
        `,
      },
    ],
    resources: [
      'https://apple.stackexchange.com/questions/254380/why-am-i-getting-an-invalid-active-developer-path-when-attempting-to-use-git-a',
    ],
  },
  {
    question: '',
    answer: [
      { text: '' },
      { code: '' },
    ],
    resources: [
      '',
    ],
  },
  {
    question: '',
    answer: [
      { text: '' },
      { code: '' },
    ],
    resources: [
      '',
    ],
  },
];

export default list;
