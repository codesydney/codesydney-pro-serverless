# This is Developers Guide for Reference

## NestJS Schematics to build boiler plate modules, components, services, guard etc

## Depending on the user env configuration might need to run (npx nest cli)

https://docs.nestjs.com/cli/usages

Example 1: create modeule

### (--dry-run) flag is a preview so no code is generated, its good for double checking

nest generate <schematic> <name> [options]

nest generate module users --dry-run

nest generate <schematic> <directory>/<name> [options]

### We can use g as short hand

nest g service users/service/user --dry-run

nest g controller users/controller/user --dry-run
