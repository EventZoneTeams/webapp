"use client";

import {
  Country,
  formatPhoneNumber,
  formatPhoneNumberIntl,
  getCountryCallingCode,
} from "react-phone-number-input";
import { PhoneInput } from "@/components/ui/phone-input";
import { useState } from "react";

export default function ExamplePhoneInput() {
  const [country, setCountry] = useState<Country>();
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <div>
      <PhoneInput
        value={phoneNumber}
        onChange={setPhoneNumber}
        onCountryChange={setCountry}
        placeholder="Enter a phone number"
      />
      <div className="mt-4 space-y-2 text-sm">
        <div>National: {phoneNumber && formatPhoneNumber(phoneNumber)}</div>
        <div>
          International: {phoneNumber && formatPhoneNumberIntl(phoneNumber)}
        </div>
        <div>Country code: {country && getCountryCallingCode(country)}</div>
      </div>
    </div>
  );
}
