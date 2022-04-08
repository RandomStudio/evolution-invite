for file in *.png; do
 sips -Z 2160 "$file" --out 2160_"$file"
 sips -Z 1920 "$file" --out 1920_"$file"
 sips -Z 1600 "$file" --out 1600_"$file"
 sips -Z 1440 "$file" --out 1440_"$file"
 sips -Z 1024 "$file" --out 1024_"$file"
 sips -Z 960 "$file" --out 960_"$file"
 sips -Z 480 "$file" --out 480_"$file"
done;
