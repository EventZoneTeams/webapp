import ExampleAddressInput from "@/app/system-design/components/ExampleAddressInput";
import ExampleImageInput from "@/app/system-design/components/ExampleImageInput";
import ExamplePhoneInput from "@/app/system-design/components/ExamplePhoneInput";
import { colors } from "@/app/system-design/constant";
import { DatePicker } from "@/components/input/DatePicker";
import { InputBlock } from "@/components/input/InputVariant";
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SidebarItem {
  name: string;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  {
    name: "Color",
    href: "#color",
  },
  {
    name: "Button",
    href: "#button",
  },
  {
    name: "Dialog",
    href: "#dialog",
  },
  {
    name: "Checkbox",
    href: "#checkbox",
  },
  {
    name: "Input",
    href: "#input",
  },
];

const SystemDesign = () => {
  return (
    <div>
      <Header />

      <div className="container relative grid min-h-[5000px] grid-cols-12 gap-4 border-x bg-background">
        <nav className="col-span-2">
          <ul className="sticky top-16 min-h-screen py-5">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <Link href={item.href} className="block py-2">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="col-span-10">
          <section className="space-y-6 py-5">
            <h1 className="text-2xl font-bold" id="color">
              Color
            </h1>
            <div className="mt-4 space-y-4">
              <h3 className="text-lg font-semibold">Shadcn Ui color</h3>
              <div className="flex flex-wrap gap-6">
                {colors.map((color) => (
                  <div
                    key={color.name}
                    className={cn(
                      "line-clamp-1 flex size-24 items-center justify-center rounded border p-4",
                      color.backgroundColorClassName,
                      color.textColorClassName,
                    )}
                  >
                    <span>{color.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Link
                href={"https://tailwindcss.com/docs/customizing-colors"}
                className="text-lg text-blue-500 underline"
                target="_blank"
              >
                Tailwind color
              </Link>
            </div>
          </section>
          <section className="space-y-6 py-5">
            <h1 className="text-2xl font-bold" id="button">
              Button
            </h1>
            <div className="grid grid-cols-6 gap-4">
              <Button>Primary</Button>
              <Button variant={"secondary"}>Secondary</Button>
              <Button variant={"destructive"}>Destructive</Button>
              <Button variant={"ghost"}>Ghost</Button>
              <Button variant={"link"}>Link</Button>
              <Button variant={"outline"}>Outline</Button>
            </div>
          </section>
          <section className="space-y-6 py-5">
            <h1 className="text-2xl font-bold" id="dialog">
              Dialog
            </h1>
            <div className="grid grid-cols-6 gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={"outline"}>Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </section>
          <section className="space-y-6 py-5">
            <h1 className="text-2xl font-bold" id="checkbox">
              Checkbox
            </h1>
            <div className="flex items-center gap-4">
              <Checkbox id="checkbox" />
              <label htmlFor="checkbox" className="select-none">
                Checkbox
              </label>
            </div>
          </section>
          <section className="space-y-6 py-5">
            <h1 className="text-2xl font-bold" id="input">
              Input
            </h1>
            <div className="space-y-4">
              <Input placeholder="Input" className="bg-[#f9fafb]" />

              <InputBlock
                root={{ variant: "default", size: "lg" }}
                placeholder="Default"
              />
              <InputBlock
                root={{ variant: "filled", size: "lg" }}
                placeholder="Filled"
              />
              <InputBlock
                root={{ variant: "ghost", size: "lg" }}
                placeholder="Ghost"
              />
              <InputBlock
                root={{ variant: "neubrutalism", size: "lg" }}
                placeholder="Neubrutalism"
              />
              <InputBlock
                root={{ variant: "underlined", size: "lg" }}
                placeholder="Underlined"
              />
              <h2 className="font-semibold">Date</h2>
              <DatePicker />
              <DatePicker showTime />
              <h2 className="font-semibold">Phone</h2>
              <ExamplePhoneInput />
              <h2 className="font-semibold">Image</h2>
              <ExampleImageInput />
              <h2 className="font-semibold">Address</h2>
              <ExampleAddressInput />
            </div>
          </section>
          <section className="space-y-6 py-5">
            <h1 className="text-2xl font-bold" id="button">
              Card
            </h1>
            <div className="space-y-4"></div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SystemDesign;
