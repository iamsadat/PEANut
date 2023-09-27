"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { languageOptions } from "@/lib/languageOptions";
import { useEffect } from "react";

export function LanguagesDropdown({ onSelectChange }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  useEffect(() => {
    console.log("value...", value);
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? languageOptions.find((language) => language.name === value)?.name
            : "Select language..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search language..." />
          <CommandEmpty>No languages found.</CommandEmpty>
          <CommandGroup>
            {languageOptions.map((language) => (
              <CommandItem
                key={language.id}
                onSelect={() => {
                  setOpen(false);
                  setValue(language.name);
                }}
                onChange={(selectedOption) => onSelectChange(selectedOption)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === language.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {language.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
