{ pkgs }: {
    deps = [
        pkgs.minio-client
        pkgs.nodejs-16_x
        pkgs.cowsay
    ];
}