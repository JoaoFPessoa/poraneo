import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  imageSrc: string;
  title: string;
  description: string;
  price: string;
}

export function HoverLiftCard({
  imageSrc,
  title,
  description,
  price,
}: ProductCardProps) {
  return (
    <Card className="w-full max-w-sm mx-auto transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg">
      <CardContent className="p-4">
        <div className="relative w-full pt-[100%] overflow-hidden rounded-lg">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <h3 className="mt-4 text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-lg font-bold">{price}</span>
        <Button>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}
