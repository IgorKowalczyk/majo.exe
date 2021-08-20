#! /bin/bash

echo -e "--- Select a option ---"

options=(
 "Start all modules (Bot & Dashboard)" # 1
 "Start Bot" # 2
 "Start Dashboard" # 3
 "[Dev] Format Code" # 4
 "[Dev] Check Code Formatting" # 5
 " - Exit" #6
)


finished=
while test ! "$finished"; do
    select option in "${options[@]}"; do
      case "$REPLY" in
           1)
            echo -e "Running all modules (Bot & Dashboard)"
            npm run start
            continue
            ;;
           2)
           echo -e "Running Discord Bot"
            npm run bot
            continue
            ;;
           3)
           echo -e "Running Dashboard"
           npm run dashboard
           continue
           ;;
           4)
           echo -e "Formatting code"
           npm run format
           continue
           ;;
           5)
           echo -e "Checking code formatting"
           npm run format:check
           continue
           ;;
           6)
            echo -e "Exiting..."
            ps -ef | grep start.sh | grep -v grep | awk '{print $2}' | xargs kill
      esac
      break
    done
done
