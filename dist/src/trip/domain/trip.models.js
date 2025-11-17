"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripInternalStatus = exports.TripSummaryStatus = void 0;
var TripSummaryStatus;
(function (TripSummaryStatus) {
    TripSummaryStatus["SEARCHING_FOR_DRIVER"] = "SEARCHING_FOR_DRIVER";
    TripSummaryStatus["DRIVER_ASSIGNED"] = "DRIVER_ASSIGNED";
    TripSummaryStatus["IN_PROGRESS"] = "IN_PROGRESS";
    TripSummaryStatus["PAYMENT_PENDING"] = "PAYMENT_PENDING";
    TripSummaryStatus["ARCHIVED"] = "ARCHIVED";
})(TripSummaryStatus || (exports.TripSummaryStatus = TripSummaryStatus = {}));
var TripInternalStatus;
(function (TripInternalStatus) {
    TripInternalStatus["REQUESTED"] = "REQUESTED";
    TripInternalStatus["ACCEPTED"] = "ACCEPTED";
    TripInternalStatus["STARTED"] = "STARTED";
    TripInternalStatus["COMPLETED"] = "COMPLETED";
    TripInternalStatus["CANCELLED"] = "CANCELLED";
})(TripInternalStatus || (exports.TripInternalStatus = TripInternalStatus = {}));
//# sourceMappingURL=trip.models.js.map