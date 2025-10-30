import { Card, CardContent } from "@/components/ui/card";

interface CardIconProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  iconBgColor: string;
  valueColor: string;
}

const CardIcon = ({
  title,
  value,
  icon: Icon,
  iconColor,
  iconBgColor,
  valueColor,
}: CardIconProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{title}</p>
            <p className="text-2xl font-bold" style={{ color: valueColor }}>
              {value}
            </p>
          </div>
          <div
            className="p-2 rounded-full"
            style={{ backgroundColor: iconBgColor }}
          >
            <div style={{ color: iconColor }}>
              <Icon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default CardIcon;
