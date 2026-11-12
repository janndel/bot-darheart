#!/bin/bash
DIR=/data/data/com.termux/files/home/bot-darheart
PID_FILE=$DIR/bot.pid
LOG=$DIR/watchdog.log
cd "$DIR" || exit 1
while true; do
    VIVO=0
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE" 2>/dev/null)
        if [ -n "$PID" ] && kill -0 "$PID" 2>/dev/null; then
            VIVO=1
        fi
    fi
    if [ "$VIVO" -eq 0 ]; then
        nohup node index.js >> bot.log 2>&1 < /dev/null &
        NUEVO=$!
        echo "$NUEVO" > "$PID_FILE"
        echo "$(date) Reiniciando bot (PID $NUEVO)" >> "$LOG"
    fi
    sleep 60
done
