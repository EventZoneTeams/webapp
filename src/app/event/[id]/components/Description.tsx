export default function Description({ description }: { description: String }) {
  return (
    <div className="p-6 w-full">
      <p className=" text-2xl mb-6 font-semibold">Description</p>
      <div>{description}</div>
    </div>
  );
}
