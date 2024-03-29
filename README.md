# Getting Started with AWS and Apex Up For Windows 10 Users

## Prerequisits:

1. You need to be running the Windows 10 Anniversary Update on your machine. 
2. You need to be running the 64-bit version of Windows 10. 

### Enable Windows Subsystem for Linux (WSL)

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

Alternatively:
1. Open PowerShell as an administrator and run: 
> `Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux`
2. It will prompt you to reboot your computer. Type "Y" and proceed with that to complete the operation.

#### Install a Linux Distribution:

1. [Install your Linux distribution package](https://4sysops.com/archives/running-the-aws-cli-in-python-on-windows-10-in-a-linux-bash-shell/)
2. Only for the Windows 10 Fall Creators Update (Windows build 16215) and later, you can install it from the Microsoft Store
3. Open the Microsoft Store from the Start menu and then search for "Linux" in the Search bar at the top-right corner. You'll get a list of Linux packages.
4. Now choose any Linux distribution. I'll choose Ubuntu in this case.

#### Install/Initialize Bash Shell

After your computer restarts, you will notice that Bash will not appear in the `Recently added` list of apps, this is because Bash isn't actually installed yet. Now that you have setup the necessary components, use the following steps to complete the installation of Bash:

1. Open Start, do a search for "bash.exe", and press Enter.
2. On the command prompt, type "y" and press Enter to download and install Bash from the Windows Store.
3. Then you'll need to create a default UNIX user account. This account doesn't have to be the same as your Windows account. Enter the username in the required field and press Enter (you can't use the username "admin").
4. Close the "bash.exe" command prompt.
5. If you're using [`cmder`](https://cmder.net/) (my preferred windows terminal) you can actually open `wsl` bash from your working directory within it by typing `wsl` and hitting enter. To exit - within `wsl` - just type `exit` (`exit` caveat: this will clear your terminal and, if you change directories while within `wsl`, it will not be reflected by `cmder`, i.e., you will return to the same directory you left in `cmder`)

## AWS CLI Setup

### Install `pip3` and `python3`: 
1. Open your bash/terminal
2. Install Python 3: `sudo apt-get install python3`
3. Verify install: `python3 --version`
4. Update apt-get: `sudo apt-get update`
5. Install Pip3: `sudo apt-get install python3-pip`
6. Verify install: `pip3 --version`
7. Add PATH variables: `export PATH=~/.local/bin:~/Library/Python/3.6/bin:$PATH`
8. Restart bash terminal (close and open again)

### Install AWS CLI [via `pip3` and `python3`](https://github.com/rajivkanaujia/alphaworks/wiki/Installing-AWS-CLI-via-pip3-and-python3):
1. Upon opening the refreshed bash terminal, switch to WSL with `wsl`
2. `pip3 install --user --upgrade awscli` ([more from AWS docs here](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html))
3. Add your PATH variables: `export PATH=~/.local/bin:$PATH`
4. Verify install: `aws --version`
5. List all packages in pip3: `pip3 list`

### Setup AWS IAM policy for a Group with `Up`'s required permissions:

1. Go to the AWS console and select [`IAM`](https://console.aws.amazon.com/iam/home)
2. Select `Groups` from the left menu
3. `Create New Group`
4. Set Group Name > `Next Step` > `Next Step` > `Create Group` (don't worry, we'll set permissions in the next step
5. Select your new Group from the list of Groups
6. Go to the `Permissions` Tab and click the `Inline Policies` dropdown
7. Go to the `Up` [docs IAM policy](https://apex.sh/docs/up/credentials/#iam_policy_for_up_cli)
8. Copy the JSON config. At the time of writing, it looks like this:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "acm:*",
                "cloudformation:Create*",
                "cloudformation:Delete*",
                "cloudformation:Describe*",
                "cloudformation:ExecuteChangeSet",
                "cloudformation:Update*",
                "cloudfront:*",
                "cloudwatch:*",
                "ec2:*",
                "ecs:*",
                "events:*",
                "iam:AttachRolePolicy",
                "iam:CreatePolicy",
                "iam:CreateRole",
                "iam:DeleteRole",
                "iam:DeleteRolePolicy",
                "iam:GetRole",
                "iam:PassRole",
                "iam:PutRolePolicy",
                "lambda:AddPermission",
                "lambda:Create*",
                "lambda:Delete*",
                "lambda:Get*",
                "lambda:InvokeFunction",
                "lambda:List*",
                "lambda:RemovePermission",
                "lambda:Update*",
                "logs:Create*",
                "logs:Describe*",
                "logs:FilterLogEvents",
                "logs:Put*",
                "logs:Test*",
                "route53:*",
                "route53domains:*",
                "s3:*",
                "ssm:*",
                "sns:*"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": "apigateway:*",
            "Resource": "arn:aws:apigateway:*::/*"
        }
    ]
}
```

9. Go back to the `Inline Policies` of your AWS IAM Group and click the `click here` button
10. Choose the `Custom Polity` radio button and click the `select` button
11. You'll see "Review Policy", wherein you'll name the policy (e.g., `up-policy`) and paste your Up config JSON into the `Policy Document`
12. Click `Apply Policy`
13. You can optionally choose to `Simulate Policy` from the proceeding menu to test one or more of the permissions you've given Up (no pun intended).

### Setup an IAM User under Your New Group

1. Go to the AWS IAM Console
2. Select `Users` from the left menu
3. Choose `Add user` from the dashboard
4. In the Add user wizard (step 1), Set user details -> User name (e.g., `yourProfileName`) -> select the "Programmatic access" checkbox under `Access type`
5. Click `Next: Permissions`
6. Add the user to your Group by selecting it from the `Add user to group` table
7. Click `Next: Tags` and skip adding tags (unless you know what those do and want to do that) > `Next: Review`
8. Click `Create User`
9. **NOW DON'T LEAVE THIS PAGE** -> you'll need these credentials to setup the AWS CLI and you'll only get to see your secret once!


### Configuring AWS [Named Profiles](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html):
1. Open your bash
2. To give a profile a name (recommended for use in a mult-project environment), just add the `--profile <name>` to the `aws configure` option. Example:

```
aws configure --profile yourProfileName
AWS Access Key ID [None]: 12334567890 <- copy/paste (be sure not to include any leading/trailing whitespaces) your Key ID
AWS Secret Access Key [None]: ABCDEFGHIJKLMNOPQRSTUVWXYZ <- copy/paste your Secret
Default region name [None]: us-east-1
Default output format [None]: json
```

To see/list all profiles on machine use: 
`cat ~/.aws/credentials`
or
`cat  ~/.aws/credentials | grep "\["`


## Setting up `Up`

1. Create an IAM user/group and use the `Inline Policies` option to copy paste the permissions `Up` needs to do its thing as JSON ([more from AWS docs here](https://aws.amazon.com/blogs/security/back-to-school-understanding-the-iam-policy-grammar/))
2. Ensure admin privaleges: `sudo chown -R $(whoami) /usr/local/bin/` in bash
3. Download/install Up: `curl -sf https://up.apex.sh/install | sh`

### Hello world on AWS via Up

1. First, verify the name of the target AWS profile `cat ~/.aws/credentials`
2. Create a hello world project
  a. Create a new empty directory, change into it
  b. If you want to use the WSL bash as your GIT terminal, see "Further Reading"
  c. Else, in your regular windows terminal (e.g., cmder) `git init` > `git add .` && `git commit ...`
3. back in the WSL bash, execute: `up`
4. You'll be prompted: `No up.json found, create a new project?`
5. Type "y" and enter
6. For the project name, just name it whatever you want e.g., `helloworld`
7. You'll be prompted by up to choose the target profile (e.g., `yourProfileName` from above)
8. **the main file (executed in your lambda) must be named `app.js`**

... continue the steps on the [Up docs](https://apex.sh/docs/up/getting-started/)


## For `Up Pro`:

1. `up team subscribe`
2. ... sign on the dotted line
3. `up upgrade`
4. Note, you may be defaulted into your team as your user email address. If you created your pro subscription under a team name, you'll need to `up team login --team <your pro team name>` before `up upgrade`ing


## For AWS Layers

### Create layer (Windows 10):

- see [docs](https://apex.sh/docs/up/configuration/#lambda_settings.layers)
- other [docs](http://p.agnihotry.com/post/php_aws_lambda_runtime/)


### `wsl` Prerequisites 
- if you don't have it, get npm: `sudo apt-get install npm`
- if you don't have it, get make: `sudo apt-get install make`
- if you don't have it, get zip: `sudo apt-get install zip`
- make sure you have an up to date version of [node](https://www.hostingadvice.com/how-to/update-node-js-latest-version/):
- install the `n` package (or consider [nvs](https://github.com/jasongin/nvs))
```
sudo npm cache clean -f
sudo npm install -g n
sudo n stable 
```
(here you can use `n stable` or `n x.x.x` for the version you want)

### Example:
```
$ mkdir nodejs
$ npm install chrome-aws-lambda puppeteer-core
$ mv node_modules nodejs
$ zip -r function.zip . <- see powershell directions
$ aws lambda publish-layer-version \
  --layer-name nodejs-chrome \
  --description "Node.js Headless Chrome" \
  --license-info MIT \
  --zip-file fileb://function.zip \
  --compatible-runtimes nodejs6.10 nodejs8.10
```

## Additional Notes

- If you'd like to edify yourself on the available commands within `wsl`: Get started with some Linux Shell tutorials [on YouTube](https://www.youtube.com/watch?v=NQ9txYZpYKo)
- For automated environment variables management in `wsl`, check out [`direnv`](https://direnv.net/). It augments your shell with a feature that can load and unload environment variables depending on the current directory, which is really handy when working with Up and AWS CLI `configure`!
- getting GIT to work across environments is a topic of it's own. See "Further Reading" below for some starting points



### [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)
This does some cool stuff for windows 10/vs code users with the WSL


### Further Reading:
- [How to use GIT and other Linux tools in WSL on Windows](https://medium.com/faun/how-to-use-git-and-other-linux-tools-in-wsl-on-windows-4c0bffb68b35)
- [ConEmu Bash on Windows](https://conemu.github.io/en/BashOnWindows.html)
- Get to know [Up](http://apex.sh/up/)
- Get to know [Apex](http://apex.run/)
- Find a [database that works with Up](https://github.com/apex/up/wiki#databases)
