
current_dir=$(pwd)


cd ./src/models || exit 1
mv stopSchema.js Stop.js
mv routeSchema.js Route.js
mv tripSchema.js Trip.js
mv userSchema.js User.js
mv ticketSchema.js Ticket.js
mv subscriptionSchema.js Subscription.js
mv paymentSchema.js Payment.js
mv userSchema.js User.js
cd "$current_dir" || exit 1