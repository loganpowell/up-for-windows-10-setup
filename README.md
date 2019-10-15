# Getting Started with AWS and Apex Up For Windows 10 Users

## Prerequisits:

1. You need to be running the Windows 10 Anniversary Update on your machine. 
2. You need to be running the 64-bit version of Windows 10. 

### Install Bash Shell

1. Open Settings.
2. Click on `Update & security`.
3. Click on the `For Developers` tab on the left menu
4. Under "Use developer features", select the `Developer mode` option to setup the environment to install Bash.
5. Upon prompting of a message dialog, click Yes to turn on developer mode.
6. After the necessary components install, you'll need to restart your computer.
7. Once your computer reboots, open `Control Panel`
8. Click on `Programs`
9. Click on `Turn Windows features on or off`
10. Check the `Windows Subsystem for Linux (beta)` checkbox/option.
11. Click `OK`
12. Once the components installed on your computer, click the `Restart now` button to complete the task.

#### Enable the Windows Subsystem for Linux (WSL):

1. Open PowerShell as an administrator and run: 
> `Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux`
2. It will prompt you to reboot your computer. Type "Y" and proceed with that to complete the operation.
3. [Install your Linux distribution package](https://4sysops.com/archives/running-the-aws-cli-in-python-on-windows-10-in-a-linux-bash-shell/)
4. Only for the Windows 10 Fall Creators Update (Windows build 16215) and later, you can install it from the Microsoft Store
5. Open the Microsoft Store from the Start menu and then search for "Linux" in the Search bar at the top-right corner. You'll get a list of Linux packages.
6. Now choose any Linux distribution. I'll choose Ubuntu in this case.

#### Initializing the Bash Shell

After your computer restarts, you will notice that Bash will not appear in the `Recently added` list of apps, this is because Bash isn't actually installed yet. Now that you have setup the necessary components, use the following steps to complete the installation of Bash:

1. Open Start, do a search for "bash.exe", and press Enter.
2. On the command prompt, type "y" and press Enter to download and install Bash from the Windows Store.
3. Then you'll need to create a default UNIX user account. This account doesn't have to be the same as your Windows account. Enter the username in the required field and press Enter (you can't use the username "admin").
4. Close the "bash.exe" command prompt.

## AWS CLI Setup

### Install `pip3` and `python3`: 
1. Install Python 3: `sudo apt-get install python3`
2. Verify install: `python3 --version`
3. Install Pip3: `sudo apt install python3-pip`
4. Verify install: `pip3 --version`
5. Add PATH variables: `export PATH=~/.local/bin:~
/Library/Python/3.6/bin:$PATH`


### Install AWS CLI [via `pip3` and `python3`](https://github.com/rajivkanaujia/alphaworks/wiki/Installing-AWS-CLI-via-pip3-and-python3):
1. `pip3 install --user --upgrade awscli` ([more from AWS docs here](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html))
2. Add your PATH variables: `export PATH=~/.local/bin:$PATH`
3. Verify install: `aws --version`
4. List all packages in pip3: `pip3 list`

### Configuring AWS [Named Profiles](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html):

1. To give a profile a name (recommended for use in a mult-project environment), just add the `--profile <name>` to the `aws configure` option. Example:

```
aws configure --profile yourProfileName
AWS Access Key ID [None]: 12334567890
AWS Secret Access Key [None]: ABCDEFGHIJKLMNOPQRSTUVWXYZ
Default region name [None]: eu-west-1
Default output format [None]: json
```

2. Listing all profiles on machine: `cat ~/.aws/credentials`


### Setup AWS IAM policy with `Up`s required permissions:

1. Go to the AWS console and select [`IAM`](https://console.aws.amazon.com/iam/home)
2. Select `Groups` from the left menu
3. `Create New Group`
4. Set Group Name > `Next Step` > `Next Step` > `Create Group` (don't worry, we'll set permissions in the next step
5. Select your new Group from the list of Groups
6. Go to the `Permissions` Tab and click the `Inline Policies` dropdown
7. Go to the `Up` [docs IAM policy](https://apex.sh/docs/up/credentials/#iam_policy_for_up_cli)
8. Copy the JSON config
9. Go back to the `Inline Policies` of your AWS IAM Group and click the `click here` button
10. Choose the `Custom Polity` radio button and click the `select` button
11. You'll see "Review Policy", wherein you'll name the policy (e.g., `up-policy`) and paste your Up config JSON into the `Policy Document`
12. Click `Apply Policy`
13. You can optionally choose to `Simulate Policy` from the proceeding menu to test one or more of the permissions you've given Up (no pun intended).

## Setting up `Up`

1. Create an IAM user/group and use the `Inline Policies` option to copy paste the permissions `Up` needs to do its thing as JSON ([more from AWS docs here](https://aws.amazon.com/blogs/security/back-to-school-understanding-the-iam-policy-grammar/))
2. Ensure admin privaleges: `sudo chown -R $(whoami) /usr/local/bin/` in bash
3. Download/install Up: `curl -sf https://up.apex.sh/install | sh`

### Hello world on AWS via Up

1. First, verify the name of the target AWS profile `cat ~/.aws/credentials`
2. Create a new empty directory, change into it and `git init` 
3. `up`
4. You'll be prompted: `No up.json found, create a new project?`
5. Type "y" and enter
6. For the project name, just name it whatever you want e.g., `helloworld`
7. You'll be prompted by up to choose the target profile (e.g., `yourProfileName` from above)

... continue the steps on the [Up docs](https://apex.sh/docs/up/guides/)



### For `Up Pro`:

1. `up team subscribe`
2. ... sign on the dotted line
3. `up upgrade`
4. Note, you may be defaulted into your team as your user email address. If you created your pro subscription under a team name, you'll need to `up team login --team <your pro team name>` before `up upgrade`ing

#### [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)
This does some cool stuff for windows 10/vs code users with the WSL
